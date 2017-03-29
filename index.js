const endpoint = 'https://api.esa.io/v1'
const container = document.getElementsByClassName('divBtn')[0]
const zpad = n => n.toString().length === 1 ? `0${n}` : n.toString()
const button = document.createElement('span')
button.textContent = 'esa からロード'
button.className = 'btn btnSubmit'
button.style = 'background-color: #0a9b94;'
button.addEventListener('click', event => {
  const tds = document.querySelectorAll('tbody')[1].querySelectorAll('td')
  const targetDate =
    tds[0]
      .textContent.replace(/\s/g, '').split('/').map(str => str.split('(')[0])
  const startTimeInput = document.getElementById('work_start_at_str')
  const endTimeInput = document.getElementById('work_end_at_str')
  const restStartInput = document.getElementById('work_break_1_start_at_str')
  const restEndInput = document.getElementById('work_break_1_end_at_str')
  chrome.storage.local.get(
    ['team', 'token', 'screenName'],
    async ({team, token, screenName}) => {
      const query = encodeURIComponent(
        `@${screenName} 日報/${targetDate[0]}/${targetDate[1]}/${targetDate[2]}`
      )
      const res = await fetch(`${endpoint}/teams/${team}/posts?q=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const {posts} = await res.json()
      const candidates =
        posts[0].body_md.split('\n')
        .filter(row => /^\|\sオフィス\s\|/.test(row))
        .map(row => row.replace(/\s/g, '').split('|')[2].split('-'))
      const startTime = candidates[0][0]
      const endTime = candidates[candidates.length - 1][1]
      startTimeInput.value = startTime
      endTimeInput.value = endTime
      const startTimeNum = parseInt(startTime.split(':')[0])
      restStartInput.value = `${zpad(startTimeNum + 1)}:00`
      restEndInput.value = `${zpad(startTimeNum + 2)}:00`
    }
  )
})

container.appendChild(button)
