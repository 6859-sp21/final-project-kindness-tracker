// const TIMESTAMP_KEY_NAME = 'Timestamp'
// const ID_KEY_NAME = 'ID NUMBER on kindness card'
// const CITY_KEY_NAME = 'CITY where act of kindness took place'
// const STATE_KEY_NAME = 'STATE'
// const ZIP_KEY_NAME = '[OPTIONAL] ZIP CODE'
// const STREET_KEY_NAME = '[Optional] STREET NAME'
// const KINDNESS_KEY_NAME = '[Optional] Tell us about the act of kindness you received!'
// const CENTER_LNG_KEY_NAME = 'CenterLon'
// const CENTER_LAT_KEY_NAME = 'CenterLat'

const REAL_DATA_URL = 'https://docs.google.com/spreadsheets/d/1IqEBIcnFZ_BFCrD8jhk11yVoOjfxzZpiZLdL4cL3oK0/pubhtml'
const SPOOF_DATA_URL = 'https://docs.google.com/spreadsheets/d/1BvBwyy1xYYhdiokMfbyxssu5nlB0arRMvxyuQLCzsH4/pubhtml'

// this is the format used by Google sheets
const TIMESTAMP_FORMAT = 'M/d/yyyy H:mm:ss'
// 4/28/2021 13:36:45

// this is the format that was originally used by Jack in spoof data
// const TIMESTAMP_FORMAT = 'MM/dd/yy h:mm a'

// TOOD add constants for new parsed geo fields when those are avaiable
const TIMESTAMP_KEY_NAME = 'Timestamp'
const ID_KEY_NAME = 'What is the ID Number on your kindness card? (We need this to track the spread of kindness!)'
const STREET_NUMBER_KEY_NAME = 'street_number'
const STREET_KEY_NAME = 'street_name'
const CITY_KEY_NAME = 'admin_level_3'
const STATE_KEY_NAME = 'admin_level_1'
const ZIP_KEY_NAME = 'zip_code'
const KINDNESS_KEY_NAME = 'Tell us about the act of kindness you received!'
const CENTER_LNG_KEY_NAME = 'center_lng'
const CENTER_LAT_KEY_NAME = 'center_lat'

// also add a constant for the root ID
const ROOT_ACT_ID = 0

export {
    TIMESTAMP_KEY_NAME,
    ID_KEY_NAME,
    STREET_NUMBER_KEY_NAME,
    STREET_KEY_NAME,
    CITY_KEY_NAME,
    STATE_KEY_NAME,
    ZIP_KEY_NAME,
    KINDNESS_KEY_NAME,
    CENTER_LNG_KEY_NAME,
    CENTER_LAT_KEY_NAME,

    REAL_DATA_URL,
    SPOOF_DATA_URL,

    TIMESTAMP_FORMAT,

    ROOT_ACT_ID,
}
