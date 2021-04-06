export const swalLogin = (title, message) => {
  return {
    title,
    text: message,
    buttons: false,
    closeOnClickOutside: false,
    closeOnEsc: false,
    timer: 1500,
    className: 'swal-text-custom'
  }
}

export const swalSuccessLogin = (title, message) => {
  return {
    icon: 'success',
    title,
    text: message,
    button: {
      text: 'Ok, continuar'
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }
}

export const swalErrorLogin = (title, message) => {
  return {
    icon: 'error',
    title,
    text: message,
    button: {
      text: 'Fechar'
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }
}

export const swalErrorToken = (title, message) => {
  return {
    icon: 'error',
    title,
    text: message,
    button: {
      text: 'Fechar e sair'
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }
}

export const successDocument = (title, message) => {
  return {
    icon: 'success',
    title,
    text: message,
    button: {
      text: 'Continuar'
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }
}


