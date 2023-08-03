export const convertDateTime = () => {
  var humanReadableFormat = new Date().toLocaleString()
  return humanReadableFormat
}

export const shortenSentence = (sentence, maxLength) => {
  if (sentence.length > maxLength) {
    return sentence.slice(0, maxLength) + '...'
  }
  return sentence
}

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateRandomNumbers = count => {
  const numbers = []
  for (let i = 0; i < count; i++) {
    numbers.push(getRandomNumber(0, 9))
  }
  return numbers.toString().split(',').join('')
}

export const generatePassword = length => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset.charAt(randomIndex)
  }
  return password
}

export const convertToTitleCase = str => {
  // Split the string at each underscore and store the words in an array
  var words = str.split('_')

  // Iterate over each word in the array and convert the first letter to uppercase
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1)
  }

  // Join the words back together with a space in between
  var result = words.join(' ')

  return result
}

// To go back to previous page
export const handleGoPrevious = () => {
  window.history.back()
}