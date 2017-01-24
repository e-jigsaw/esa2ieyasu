chrome.storage.local.get(
  ['team', 'token', 'screenName'],
  ({team, token, screenName}) => {
    const [teamInput, tokenInput, screenNameInput] = document.querySelectorAll('input')
    teamInput.value = team
    tokenInput.value = token
    screenNameInput.value = screenName
  }
)

document.querySelector('button').addEventListener('click', event => {
  const [team, token, screenName] = Array.prototype.map.call(
    document.querySelectorAll('input'),
    el => el.value
  )
  chrome.storage.local.set({team, token, screenName})
})
