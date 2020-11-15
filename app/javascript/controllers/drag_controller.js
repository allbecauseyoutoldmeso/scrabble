import { Controller } from 'stimulus'

export default class extends Controller {
  setTransferData(event) {
    event.dataTransfer.setData('text', event.target.id)
  }

  drop(event) {
    event.preventDefault()
    const data = event.dataTransfer.getData('text')
    event.target.appendChild(document.getElementById(data))
  }

  allowDrop(event) {
    event.preventDefault()
  }
}
