const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

export const SERVER_IP =
    windowsPlatforms.indexOf(window.navigator.platform) < 0
        ? 'http://localhost:4000'
        : 'http://192.168.99.100:4000';

export const FOOD_ITEMS =
    [
        "Soup of the Day",
        "Linguini With White Wine Sauce",
        "Eggplant and Mushroom Panini",
        "Chili Con Carne"
    ];

export const QTTY_ITEMS = [1, 2, 3, 4, 5, 6];