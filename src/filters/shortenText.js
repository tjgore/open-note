export default (value, limit) => {
  var shortText = ''
  value = value.replace(/<\/?[^>]+(>|$)/g, "");
  value = value.replace(/&nbsp;/g, " ");
  if (value.length >= limit) {
    shortText = value.substring(0, limit) + '...'
  } else {
    shortText = value
  }
  return shortText  
}
