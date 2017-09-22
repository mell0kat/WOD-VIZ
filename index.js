// import config from './config'
import Tabletop from 'tabletop'
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2-Gz7SV-37unpE7LDE9z4oMVANI5fc9p2p5DWt9OxOofqWwCMsvHdKtkKQ-HejxqapQti-ePWWxc0/pubhtml?gid=0&single=true'
function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  alert('Successfully processed!')
  console.log(data);
}


window.addEventListener('DOMContentLoaded', init)
