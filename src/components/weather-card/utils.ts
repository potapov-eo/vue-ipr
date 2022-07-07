export const  getTime = (i) => {
  switch ( i ){
    case 0 : return '00:00'
    case 1 : return '03:00'
    case 2 : return '06:00'
    case 3 : return '09:00'
    case 4 : return '12:00'
    case 5 : return '15:00'
    case 6 : return '18:00'
    case 7 : return '21:00'
    case 8 : return '24:00'
    default: return '00:00'
  }
}
