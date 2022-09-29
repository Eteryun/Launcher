/* eslint-disable no-control-regex */
import net from 'net';

export const getServerStatus = (address: string, port = 25565) =>
  new Promise((resolve) => {
    const offlineStatus = { isOnline: false, players: 0, maxPlayers: 0 };

    const socket = net.connect(port, address, () => {
      const buff = Buffer.from([0xfe, 0x01]);
      socket.write(buff);
    });

    socket.setTimeout(2500);

    socket.on('data', (data) => {
      if (data) {
        const server_info = data.toString().split('\x00\x00\x00');
        const NUM_FIELDS = 6;
        if (server_info && server_info.length >= NUM_FIELDS) {
          resolve({
            isOnline: true,
            players: server_info[4].replace(/\u0000/g, ''),
            maxPlayers: server_info[5].replace(/\u0000/g, ''),
          });
        } else {
          resolve({ ...offlineStatus });
        }
      }
      socket.end();
    });

    socket.on('timeout', () => {
      resolve({ ...offlineStatus });
      socket.end();
    });
    socket.on('error', () => {
      resolve({ ...offlineStatus });
      socket.destroy();
    });
  });
