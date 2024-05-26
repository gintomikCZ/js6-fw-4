const get2digits = (num) => {
  return num < 10 ? '0' + num : '' + num
}


/*
  arg - is dateString (YYYY-MM-DD) or JS object Date
*/
export const formatDate = (arg) => {
  if (typeof arg === 'string') {
    const splited = arg.split('-')
    return splited[2] + '.' + splited[1] + '.' + splited[0]
  }
  return get2digits(arg.getDate()) + '.' + get2digits(arg.getMonth() + 1) + '.' + arg.getFullYear()
}