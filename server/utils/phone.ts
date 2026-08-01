export function normalizarTelefone(tel: string | undefined | null): string | null {
  if (!tel) return null;

  const digits = tel.replace(/\D/g, '');

  if (!digits) return null;

  if (digits.startsWith('55') && digits.length >= 12) {
    return `+${digits}`;
  }

  return `+55${digits}`;
}
