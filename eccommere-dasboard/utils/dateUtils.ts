const now = new Date();

export const addDate = (date: number): Date =>
  new Date(now.setDate(now.getDate() + date));
