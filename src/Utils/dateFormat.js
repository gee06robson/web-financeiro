const dateFormat = require("dateformat")
dateFormat.i18n = {
  dayNames: [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feita",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ],
  monthNames: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
}

const checkData = (data) => {
      
  var dtArray = data.split("/")

  if (dtArray === null)
    return false

  var dtDay= Number(dtArray[0])
  var dtMonth = Number(dtArray[1])
  var dtYear = Number(dtArray[2])

  if (dtMonth < 1 || dtMonth > 12)
    return false
  else if (dtDay < 1 || dtDay > 31)
    return false
  else if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31)
    return false
  else if (dtMonth === 2) {
    var isleap = (dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0))
    if (dtDay > 29 || (dtDay === 29 && !isleap))
      return false
  }
  
  return true
}


export const dealWithData = async (data) => {
  data.value = data.value.replace(".",  "")
  data.value = data.value.replace(",", ".")

  if (data.reason)
      data.reason = data.reason.toUpperCase()

  if (data.description)
      data.description = data.description.toUpperCase()

  if (checkData(data.emission)) 
    data.emission = new Date(data.emission.split("/").reverse()).toISOString()
  else throw new Error('Data de emissão informada não é válida')
  
  if (checkData(data.due)) 
    data.due = new Date(data.due.split("/").reverse()).toISOString()
  else if (data.due === "")
    data.due = ""
  else  throw new Error('Data de vencimento informada não é válida')
  
  return data
}

export const toConvert = (data) => {
  if (checkData(data))
    return dateFormat(data, "dd/mm/yyyy")
  else 
    return ""
}

export const toTranslate = (data) => {
  if (checkData(data))
    return `Brasília, DF, ${dateFormat(data, "dd")} de ${dateFormat(data, "mmmm")} de ${dateFormat(data, "yyyy")}.`
  else 
    return ""
}

export const SPMaskBehavior = (val) => {

  val = val.replaceAll(/[^0-9]/g, "")
  
  switch (val.length) {
    case 14: return '00.000.000/0000-00'
    case 11: return '000.000.000-00'
    case  6: return '000000'
    default: return 'Error!'
  }

}

export const handleRetention = async (data) => {

  data.calculation = data.calculation.replace(".",  "")
  data.calculation = data.calculation.replace(",", ".")

  data.percentage = data.percentage.replace(".",  "")
  data.percentage = data.percentage.replace(",", ".")

  if (data.code.length!==4) throw new Error('código informado não é válido')
  if (data.percentage.length < 4 || data.percentage.length > 6) throw new Error('porcentagem informada não é válida')

  return data
}

export const currencyFormat = (value) => {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export const truncate = (value) => {
  if (value.length > 30) {
    return value.substring(0, 30) + '...';
  }
  return value;
}

export const delay = (amount = 750) => new Promise(resolve => setTimeout(() => { return resolve } , amount))
