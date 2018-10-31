const key = 'uber-app';

export const save = value => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clear = () => {
  localStorage.setItem(key, null);
};

export const load = () => {
  const rawValue = localStorage.getItem(key);
  let result;
  try {
    result = JSON.parse(rawValue);
  } catch (e) {
    result = null;
  }
  return result;
};
