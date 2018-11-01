export default async error => {
  const res = await error.json();

  return res;
};
