import { getServerStatus } from '@common/utils/server';

const getStatus = async ({
  address,
  port,
}: {
  address: string;
  port: number;
}) => {
  return await getServerStatus(address, port);
};

export const ServerController = {
  getStatus,
};
