import numbro from 'numbro';

export const average = (payload: number) => numbro(payload).format({ average: true });
