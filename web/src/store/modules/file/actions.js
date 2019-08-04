export function loadFile(file) {
  return {
    type: '@file/LOAD_FILE',
    payload: { file },
  };
}
