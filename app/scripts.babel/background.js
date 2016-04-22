'use strict';

//chrome.runtime.onInstalled.addListener(details => {
//  console.log('previousVersion', details.previousVersion);
//});




let targetTimeZone = moment.tz.guess();
let sourceTimezone = moment.tz.guess();
console.info(`Browser timezone is ${targetTimeZone}`);

updateTimezoneOnBadge(moment().tz(targetTimeZone).format("Z z"));

function updateTimezoneOnBadge(timezone) {
  chrome.browserAction.setBadgeText({text: timezone.replace('+0','+')});
}

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

function timeZoneSelect(timezone, timeOnPage) {
  console.info(`Selected Timezone ${timezone}: time on page ${timeOnPage}`);
  try {
    sourceTimezone = timezone;
    const timeOnPageMoment = validateTime(timeOnPage);
    const formatedTime = moment.tz(timeOnPage, possibleFormats, sourceTimezone).tz(targetTimeZone);
    console.log(timeOnPage, formatedTime.format('lll'));


    chrome.contextMenus.update(Convert_Time_Menu, {
      title: timeMenu(sourceTimezone, targetTimeZone)
    })

    alert(`
${timeOnPage} ===> (${timeOnPageMoment.format('lll')})
${timezone} ===> ${targetTimeZone}
------------------------------------
${formatedTime.format('lll')}  (${formatedTime.fromNow()})
`
    );

  } catch (e) {
    console.error(e);
  }
}

function validateTime(timeString) {
  if (moment(timeString, possibleFormats).isValid()) {
    return moment(timeString, possibleFormats);
  } else if (moment(timeString).isValid()) {
    return moment(timeString);
  } else {
    throw new Error('Invalid Time');
  }
}

const possibleFormats = [
  "MM-DD-YYYY", "YYYY-MM-DD",
  "h:m a", "H:m"
];

const Current_TimeZone_Menu = chrome.contextMenus.create({
  title: `Target timezone : ${targetTimeZone}`,
  contexts: ['selection'],
  enabled: false,
});

const timeMenu = (currentTimezone, targetTimezone) => `Convert time ${currentTimezone} ==> ${targetTimezone}`

const Convert_Time_Menu = chrome.contextMenus.create({
  title: timeMenu(sourceTimezone, targetTimeZone),
  contexts: ['selection'],
  enabled: true,
  onclick: ({selectionText}) => timeZoneSelect(
    sourceTimezone,
    selectionText
  )
});

const Set_TimeZone_Menu = chrome.contextMenus.create({
  title: `Set Timezone`,
  contexts: ['selection'],
  enabled: true,
});


const timezones = [
  "Africa/Abidjan|Africa/Bamako",
  "Africa/Abidjan|Africa/Banjul",
  "Africa/Abidjan|Africa/Conakry",
  "Africa/Abidjan|Africa/Dakar",
  "Africa/Abidjan|Africa/Freetown",
  "Africa/Abidjan|Africa/Lome",
  "Africa/Abidjan|Africa/Nouakchott",
  "Africa/Abidjan|Africa/Ouagadougou",
  "Africa/Abidjan|Africa/Sao_Tome",
  "Africa/Abidjan|Africa/Timbuktu",
  "Africa/Abidjan|Atlantic/St_Helena",
  "Africa/Cairo|Egypt",
  "Africa/Johannesburg|Africa/Maseru",
  "Africa/Johannesburg|Africa/Mbabane",
  "Africa/Khartoum|Africa/Juba",
  "Africa/Lagos|Africa/Bangui",
  "Africa/Lagos|Africa/Brazzaville",
  "Africa/Lagos|Africa/Douala",
  "Africa/Lagos|Africa/Kinshasa",
  "Africa/Lagos|Africa/Libreville",
  "Africa/Lagos|Africa/Luanda",
  "Africa/Lagos|Africa/Malabo",
  "Africa/Lagos|Africa/Niamey",
  "Africa/Lagos|Africa/Porto-Novo",
  "Africa/Maputo|Africa/Blantyre",
  "Africa/Maputo|Africa/Bujumbura",
  "Africa/Maputo|Africa/Gaborone",
  "Africa/Maputo|Africa/Harare",
  "Africa/Maputo|Africa/Kigali",
  "Africa/Maputo|Africa/Lubumbashi",
  "Africa/Maputo|Africa/Lusaka",
  "Africa/Nairobi|Africa/Addis_Ababa",
  "Africa/Nairobi|Africa/Asmara",
  "Africa/Nairobi|Africa/Asmera",
  "Africa/Nairobi|Africa/Dar_es_Salaam",
  "Africa/Nairobi|Africa/Djibouti",
  "Africa/Nairobi|Africa/Kampala",
  "Africa/Nairobi|Africa/Mogadishu",
  "Africa/Nairobi|Indian/Antananarivo",
  "Africa/Nairobi|Indian/Comoro",
  "Africa/Nairobi|Indian/Mayotte",
  "Africa/Tripoli|Libya",
  "America/Adak|America/Atka",
  "America/Adak|US/Aleutian",
  "America/Anchorage|US/Alaska",
  "America/Argentina/Buenos_Aires|America/Buenos_Aires",
  "America/Argentina/Catamarca|America/Argentina/ComodRivadavia",
  "America/Argentina/Catamarca|America/Catamarca",
  "America/Argentina/Cordoba|America/Cordoba",
  "America/Argentina/Cordoba|America/Rosario",
  "America/Argentina/Jujuy|America/Jujuy",
  "America/Argentina/Mendoza|America/Mendoza",
  "America/Atikokan|America/Coral_Harbour",
  "America/Chicago|US/Central",
  "America/Curacao|America/Aruba",
  "America/Curacao|America/Kralendijk",
  "America/Curacao|America/Lower_Princes",
  "America/Denver|America/Shiprock",
  "America/Denver|Navajo",
  "America/Denver|US/Mountain",
  "America/Detroit|US/Michigan",
  "America/Edmonton|Canada/Mountain",
  "America/Fort_Wayne|America/Indiana/Indianapolis",
  "America/Fort_Wayne|America/Indianapolis",
  "America/Fort_Wayne|US/East-Indiana",
  "America/Halifax|Canada/Atlantic",
  "America/Havana|Cuba",
  "America/Indiana/Knox|America/Knox_IN",
  "America/Indiana/Knox|US/Indiana-Starke",
  "America/Jamaica|Jamaica",
  "America/Kentucky/Louisville|America/Louisville",
  "America/Los_Angeles|US/Pacific",
  "America/Los_Angeles|US/Pacific-New",
  "America/Manaus|Brazil/West",
  "America/Mazatlan|Mexico/BajaSur",
  "America/Mexico_City|Mexico/General",
  "America/New_York|US/Eastern",
  "America/Noronha|Brazil/DeNoronha",
  "America/Panama|America/Cayman",
  "America/Phoenix|US/Arizona",
  "America/Port_of_Spain|America/Anguilla",
  "America/Port_of_Spain|America/Antigua",
  "America/Port_of_Spain|America/Dominica",
  "America/Port_of_Spain|America/Grenada",
  "America/Port_of_Spain|America/Guadeloupe",
  "America/Port_of_Spain|America/Marigot",
  "America/Port_of_Spain|America/Montserrat",
  "America/Port_of_Spain|America/St_Barthelemy",
  "America/Port_of_Spain|America/St_Kitts",
  "America/Port_of_Spain|America/St_Lucia",
  "America/Port_of_Spain|America/St_Thomas",
  "America/Port_of_Spain|America/St_Vincent",
  "America/Port_of_Spain|America/Tortola",
  "America/Port_of_Spain|America/Virgin",
  "America/Regina|Canada/East-Saskatchewan",
  "America/Regina|Canada/Saskatchewan",
  "America/Rio_Branco|America/Porto_Acre",
  "America/Rio_Branco|Brazil/Acre",
  "America/Santiago|Chile/Continental",
  "America/Sao_Paulo|Brazil/East",
  "America/St_Johns|Canada/Newfoundland",
  "America/Tijuana|America/Ensenada",
  "America/Tijuana|America/Santa_Isabel",
  "America/Tijuana|Mexico/BajaNorte",
  "America/Toronto|America/Montreal",
  "America/Toronto|Canada/Eastern",
  "America/Vancouver|Canada/Pacific",
  "America/Whitehorse|Canada/Yukon",
  "America/Winnipeg|Canada/Central",
  "Asia/Ashgabat|Asia/Ashkhabad",
  "Asia/Bangkok|Asia/Phnom_Penh",
  "Asia/Bangkok|Asia/Vientiane",
  "Asia/Dhaka|Asia/Dacca",
  "Asia/Dubai|Asia/Muscat",
  "Asia/Ho_Chi_Minh|Asia/Saigon",
  "Asia/Hong_Kong|Hongkong",
  "Asia/Jerusalem|Asia/Tel_Aviv",
  "Asia/Jerusalem|Israel",
  "Asia/Kathmandu|Asia/Katmandu",
  "Asia/Kolkata|Asia/Calcutta",
  "Asia/Macau|Asia/Macao",
  "Asia/Makassar|Asia/Ujung_Pandang",
  "Asia/Nicosia|Europe/Nicosia",
  "Asia/Qatar|Asia/Bahrain",
  "Asia/Riyadh|Asia/Aden",
  "Asia/Riyadh|Asia/Kuwait",
  "Asia/Seoul|ROK",
  "Asia/Shanghai|Asia/Chongqing",
  "Asia/Shanghai|Asia/Chungking",
  "Asia/Shanghai|Asia/Harbin",
  "Asia/Shanghai|PRC",
  "Asia/Singapore|Singapore",
  "Asia/Taipei|ROC",
  "Asia/Tehran|Iran",
  "Asia/Thimphu|Asia/Thimbu",
  "Asia/Tokyo|Japan",
  "Asia/Ulaanbaatar|Asia/Ulan_Bator",
  "Asia/Urumqi|Asia/Kashgar",
  "Atlantic/Faroe|Atlantic/Faeroe",
  "Atlantic/Reykjavik|Iceland",
  "Australia/Adelaide|Australia/South",
  "Australia/Brisbane|Australia/Queensland",
  "Australia/Broken_Hill|Australia/Yancowinna",
  "Australia/Darwin|Australia/North",
  "Australia/Hobart|Australia/Tasmania",
  "Australia/Lord_Howe|Australia/LHI",
  "Australia/Melbourne|Australia/Victoria",
  "Australia/Perth|Australia/West",
  "Australia/Sydney|Australia/ACT",
  "Australia/Sydney|Australia/Canberra",
  "Australia/Sydney|Australia/NSW",
  "Etc/GMT+0|Etc/GMT",
  "Etc/GMT+0|Etc/GMT-0",
  "Etc/GMT+0|Etc/GMT0",
  "Etc/GMT+0|Etc/Greenwich",
  "Etc/GMT+0|GMT",
  "Etc/GMT+0|GMT+0",
  "Etc/GMT+0|GMT-0",
  "Etc/GMT+0|GMT0",
  "Etc/GMT+0|Greenwich",
  "Etc/UCT|UCT",
  "Etc/UTC|Etc/Universal",
  "Etc/UTC|Etc/Zulu",
  "Etc/UTC|UTC",
  "Etc/UTC|Universal",
  "Etc/UTC|Zulu",
  "Europe/Belgrade|Europe/Ljubljana",
  "Europe/Belgrade|Europe/Podgorica",
  "Europe/Belgrade|Europe/Sarajevo",
  "Europe/Belgrade|Europe/Skopje",
  "Europe/Belgrade|Europe/Zagreb",
  "Europe/Chisinau|Europe/Tiraspol",
  "Europe/Dublin|Eire",
  "Europe/Helsinki|Europe/Mariehamn",
  "Europe/Istanbul|Asia/Istanbul",
  "Europe/Istanbul|Turkey",
  "Europe/Lisbon|Portugal",
  "Europe/London|Europe/Belfast",
  "Europe/London|Europe/Guernsey",
  "Europe/London|Europe/Isle_of_Man",
  "Europe/London|Europe/Jersey",
  "Europe/London|GB",
  "Europe/London|GB-Eire",
  "Europe/Moscow|W-SU",
  "Europe/Oslo|Arctic/Longyearbyen",
  "Europe/Oslo|Atlantic/Jan_Mayen",
  "Europe/Prague|Europe/Bratislava",
  "Europe/Rome|Europe/San_Marino",
  "Europe/Rome|Europe/Vatican",
  "Europe/Warsaw|Poland",
  "Europe/Zurich|Europe/Busingen",
  "Europe/Zurich|Europe/Vaduz",
  "Pacific/Auckland|Antarctica/McMurdo",
  "Pacific/Auckland|Antarctica/South_Pole",
  "Pacific/Auckland|NZ",
  "Pacific/Chatham|NZ-CHAT",
  "Pacific/Chuuk|Pacific/Truk",
  "Pacific/Chuuk|Pacific/Yap",
  "Pacific/Easter|Chile/EasterIsland",
  "Pacific/Guam|Pacific/Saipan",
  "Pacific/Honolulu|Pacific/Johnston",
  "Pacific/Honolulu|US/Hawaii",
  "Pacific/Kwajalein|Kwajalein",
  "Pacific/Pago_Pago|Pacific/Midway",
  "Pacific/Pago_Pago|Pacific/Samoa",
  "Pacific/Pago_Pago|US/Samoa",
  "Pacific/Pohnpei|Pacific/Ponape"
]

const parents = {};
const COMMON_CATEGORY = 'Others';

_(timezones)
  .flatMap(zonemix => zonemix.split('|'))
  //.map((timezone) => {
  //  let [parent, ...child] = timezone.split('/');
  //  child = child.join('/');
  //  if (!child) {
  //    return [COMMON_CATEGORY, parent]
  //  }
  //  return [parent, child];
  //})
  //.each(([parent, child])=> {
  //  if (parent && child) {
  //    addNode(parent, true);
  //    addNode(child, false, parent);
  //  } else if (child && !parents[child]) {
  //    addNode(child, true);
  //  }
  //})
  .sort()
  .uniq()
  .each(timeone => {
    chrome.contextMenus.create({
      title: timeone,
      enabled: true,
      contexts: ['selection'],
      type: 'radio',
      parentId: Set_TimeZone_Menu,
      onclick: ({selectionText}) => timeZoneSelect(
        timeone,
        selectionText
      )
    })
  })
