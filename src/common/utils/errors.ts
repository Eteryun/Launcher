import { AxiosError } from 'axios';

const errors: { [k: string]: string } = {
  NOT_FOUND: 'Não existente.',
  UNKNOWN: 'Desconhecido.',
  INVALID_GRANT: 'Código fornecido inválido.',
  INVALID_REQUEST: 'Pedido inválido.',
  UNAUTHORIZED_CLIENT: 'Não autorizado.',
  ACCESS_DENIED: 'Acesso negado.',
  UNSUPPORTED_RESPONSE_TYPE: 'Tipo de pedido não suportado.',
  SERVER_ERROR: 'Erro no servidor.',
  TEMPORARILY_UNAVAILABLE: 'Temporariamente não disponível.',
  NOT_FINISHED: 'Não finalizado.',
  NOT_FOUND_ACTION: 'Ação não existente.',
};

export const parserAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = (error as AxiosError).response?.data as {
      error?: string;
      XErr?: string;
    };

    return data['error']?.toUpperCase() || data['XErr'] || 'UNKNOWN';
  }
  return 'UNKNOWN';
};

export const parserError = (error: string) => {
  return errors[error] || errors['UNKNOWN'];
};
