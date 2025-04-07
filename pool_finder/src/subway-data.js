const subwayData = {
    // Define subway lines with their color and stations
    "L": {
        color: "#A7A9AC",
        stations: [
            { name: "8th Avenue", coords: { lat: 40.7399, lng: -74.0018 } },
            { name: "6th Avenue", coords: { lat: 40.7377, lng: -73.9970 } },
            { name: "Union Square", coords: { lat: 40.7356, lng: -73.9906 } },
            { name: "3rd Avenue", coords: { lat: 40.7331, lng: -73.9868 } },
            { name: "1st Avenue", coords: { lat: 40.7308, lng: -73.9816 } },
            { name: "Bedford Avenue", coords: { lat: 40.7174, lng: -73.9565 } },
            { name: "Lorimer Street", coords: { lat: 40.7144, lng: -73.9501 } },
            { name: "Graham Avenue", coords: { lat: 40.7156, lng: -73.9443 } },
            { name: "Grand Street", coords: { lat: 40.7116, lng: -73.9409 } },
            { name: "Montrose Avenue", coords: { lat: 40.7078, lng: -73.9400 } },
            { name: "Morgan Avenue", coords: { lat: 40.7061, lng: -73.9331 } },
            { name: "Jefferson Street", coords: { lat: 40.7068, lng: -73.9229 } },
            { name: "DeKalb Avenue", coords: { lat: 40.7035, lng: -73.9185 } },
            { name: "Myrtle-Wyckoff Avenues", coords: { lat: 40.6992, lng: -73.9109 } },
            { name: "Halsey Street", coords: { lat: 40.6958, lng: -73.9039 } },
            { name: "Wilson Avenue", coords: { lat: 40.6896, lng: -73.9039 } },
            { name: "Bushwick Avenue-Aberdeen Street", coords: { lat: 40.6827, lng: -73.9054 } },
            { name: "Broadway Junction", coords: { lat: 40.6784, lng: -73.9030 } },
            { name: "Atlantic Avenue", coords: { lat: 40.6750, lng: -73.9030 } },
            { name: "Sutter Avenue", coords: { lat: 40.6690, lng: -73.9017 } },
            { name: "Livonia Avenue", coords: { lat: 40.6641, lng: -73.9009 } },
            { name: "New Lots Avenue", coords: { lat: 40.6589, lng: -73.8995 } },
            { name: "Canarsie-Rockaway Parkway", coords: { lat: 40.6457, lng: -73.9007 } }
        ]
    },
    "A": {
        color: "#0039A6",
        stations: [
            { name: "Inwood-207th Street", coords: { lat: 40.8679, lng: -73.9196 } },
            { name: "Dyckman Street", coords: { lat: 40.8608, lng: -73.9279 } },
            { name: "190th Street", coords: { lat: 40.8591, lng: -73.9342 } },
            { name: "181st Street", coords: { lat: 40.8513, lng: -73.9380 } },
            { name: "175th Street", coords: { lat: 40.8470, lng: -73.9397 } },
            { name: "168th Street", coords: { lat: 40.8407, lng: -73.9399 } },
            { name: "145th Street", coords: { lat: 40.8249, lng: -73.9444 } },
            { name: "125th Street", coords: { lat: 40.8111, lng: -73.9539 } },
            { name: "59th Street-Columbus Circle", coords: { lat: 40.7682, lng: -73.9819 } },
            { name: "42nd Street-Port Authority", coords: { lat: 40.7574, lng: -73.9897 } },
            { name: "34th Street-Penn Station", coords: { lat: 40.7523, lng: -73.9936 } },
            { name: "14th Street", coords: { lat: 40.7402, lng: -74.0018 } },
            { name: "West 4th Street", coords: { lat: 40.7320, lng: -74.0004 } },
            { name: "Jay Street-MetroTech", coords: { lat: 40.6923, lng: -73.9871 } },
            { name: "Broadway Junction", coords: { lat: 40.6784, lng: -73.9030 } }
        ]
    },
    "C": {
        color: "#0039A6",
        stations: [
            { name: "168th Street", coords: { lat: 40.8407, lng: -73.9399 } },
            { name: "145th Street", coords: { lat: 40.8249, lng: -73.9444 } },
            { name: "125th Street", coords: { lat: 40.8111, lng: -73.9539 } },
            { name: "59th Street-Columbus Circle", coords: { lat: 40.7682, lng: -73.9819 } },
            { name: "42nd Street-Port Authority", coords: { lat: 40.7574, lng: -73.9897 } },
            { name: "34th Street-Penn Station", coords: { lat: 40.7523, lng: -73.9936 } },
            { name: "14th Street", coords: { lat: 40.7402, lng: -74.0018 } },
            { name: "West 4th Street", coords: { lat: 40.7320, lng: -74.0004 } },
            { name: "Jay Street-MetroTech", coords: { lat: 40.6923, lng: -73.9871 } }
        ]
    },
    "E": {
        color: "#0039A6",
        stations: [
            { name: "Jamaica Center", coords: { lat: 40.7020, lng: -73.8013 } },
            { name: "Sutphin Boulevard", coords: { lat: 40.7061, lng: -73.8106 } },
            { name: "Queens Plaza", coords: { lat: 40.7489, lng: -73.9372 } },
            { name: "Lexington Avenue-53rd Street", coords: { lat: 40.7574, lng: -73.9696 } },
            { name: "5th Avenue-53rd Street", coords: { lat: 40.7599, lng: -73.9761 } },
            { name: "7th Avenue", coords: { lat: 40.7629, lng: -73.9813 } },
            { name: "50th Street", coords: { lat: 40.7624, lng: -73.9861 } },
            { name: "42nd Street-Port Authority", coords: { lat: 40.7574, lng: -73.9897 } },
            { name: "34th Street-Penn Station", coords: { lat: 40.7523, lng: -73.9936 } },
            { name: "14th Street", coords: { lat: 40.7402, lng: -74.0018 } },
            { name: "World Trade Center", coords: { lat: 40.7126, lng: -74.0099 } }
        ]
    },
    "B": {
        color: "#FF6319",
        stations: [
            { name: "Bedford Park Boulevard", coords: { lat: 40.8730, lng: -73.8876 } },
            { name: "Fordham Road", coords: { lat: 40.8613, lng: -73.8973 } },
            { name: "145th Street", coords: { lat: 40.8245, lng: -73.9444 } },
            { name: "125th Street", coords: { lat: 40.8110, lng: -73.9520 } },
            { name: "59th Street-Columbus Circle", coords: { lat: 40.7682, lng: -73.9819 } },
            { name: "47-50th Streets-Rockefeller Center", coords: { lat: 40.7585, lng: -73.9814 } },
            { name: "42nd Street-Bryant Park", coords: { lat: 40.7540, lng: -73.9845 } },
            { name: "34th Street-Herald Square", coords: { lat: 40.7500, lng: -73.9875 } },
            { name: "West 4th Street", coords: { lat: 40.7320, lng: -74.0004 } },
            { name: "Grand Street", coords: { lat: 40.7182, lng: -73.9957 } },
            { name: "DeKalb Avenue", coords: { lat: 40.6901, lng: -73.9813 } },
            { name: "Atlantic Avenue-Barclays Center", coords: { lat: 40.6835, lng: -73.9777 } }
        ]
    },
    "D": {
        color: "#FF6319",
        stations: [
            { name: "Norwood-205th Street", coords: { lat: 40.8748, lng: -73.8794 } },
            { name: "Bedford Park Boulevard", coords: { lat: 40.8730, lng: -73.8876 } },
            { name: "Fordham Road", coords: { lat: 40.8613, lng: -73.8973 } },
            { name: "145th Street", coords: { lat: 40.8245, lng: -73.9444 } },
            { name: "125th Street", coords: { lat: 40.8110, lng: -73.9520 } },
            { name: "59th Street-Columbus Circle", coords: { lat: 40.7682, lng: -73.9819 } },
            { name: "47-50th Streets-Rockefeller Center", coords: { lat: 40.7585, lng: -73.9814 } },
            { name: "42nd Street-Bryant Park", coords: { lat: 40.7540, lng: -73.9845 } },
            { name: "34th Street-Herald Square", coords: { lat: 40.7500, lng: -73.9875 } },
            { name: "West 4th Street", coords: { lat: 40.7320, lng: -74.0004 } },
            { name: "Grand Street", coords: { lat: 40.7182, lng: -73.9957 } },
            { name: "DeKalb Avenue", coords: { lat: 40.6901, lng: -73.9813 } },
            { name: "Atlantic Avenue-Barclays Center", coords: { lat: 40.6835, lng: -73.9777 } },
            { name: "36th Street", coords: { lat: 40.6553, lng: -74.0032 } },
            { name: "Coney Island-Stillwell Avenue", coords: { lat: 40.5773, lng: -73.9812 } }
        ]
    },
    "F": {
        color: "#FF6319",
        stations: [
            { name: "Jamaica-179th Street", coords: { lat: 40.7126, lng: -73.7844 } },
            { name: "Lexington Avenue-63rd Street", coords: { lat: 40.7646, lng: -73.9666 } },
            { name: "57th Street", coords: { lat: 40.7631, lng: -73.9777 } },
            { name: "47-50th Streets-Rockefeller Center", coords: { lat: 40.7585, lng: -73.9814 } },
            { name: "42nd Street-Bryant Park", coords: { lat: 40.7540, lng: -73.9845 } },
            { name: "34th Street-Herald Square", coords: { lat: 40.7500, lng: -73.9875 } },
            { name: "West 4th Street", coords: { lat: 40.7320, lng: -74.0004 } },
            { name: "Jay Street-MetroTech", coords: { lat: 40.6923, lng: -73.9871 } },
            { name: "York Street", coords: { lat: 40.7014, lng: -73.9868 } }
        ]
    },
    "M": {
        color: "#FF6319",
        stations: [
            { name: "Forest Hills-71st Avenue", coords: { lat: 40.7216, lng: -73.8448 } },
            { name: "Myrtle Avenue", coords: { lat: 40.6975, lng: -73.9357 } },
            { name: "Essex Street", coords: { lat: 40.7182, lng: -73.9872 } },
            { name: "Delancey Street", coords: { lat: 40.7182, lng: -73.9872 } },
            { name: "Broadway-Lafayette Street", coords: { lat: 40.7251, lng: -73.9959 } },
            { name: "West 4th Street", coords: { lat: 40.7320, lng: -74.0004 } },
            { name: "34th Street-Herald Square", coords: { lat: 40.7500, lng: -73.9875 } },
            { name: "42nd Street-Bryant Park", coords: { lat: 40.7540, lng: -73.9845 } },
            { name: "47-50th Streets-Rockefeller Center", coords: { lat: 40.7585, lng: -73.9814 } }
        ]
    },
    "N": {
        color: "#FCCC0A",
        stations: [
            { name: "Astoria-Ditmars Boulevard", coords: { lat: 40.7753, lng: -73.9121 } },
            { name: "Astoria Boulevard", coords: { lat: 40.7707, lng: -73.9180 } },
            { name: "Queensboro Plaza", coords: { lat: 40.7508, lng: -73.9401 } },
            { name: "Lexington Avenue-59th Street", coords: { lat: 40.7626, lng: -73.9672 } },
            { name: "5th Avenue-59th Street", coords: { lat: 40.7642, lng: -73.9729 } },
            { name: "57th Street-7th Avenue", coords: { lat: 40.7644, lng: -73.9805 } },
            { name: "49th Street", coords: { lat: 40.7606, lng: -73.9842 } },
            { name: "Times Square-42nd Street", coords: { lat: 40.7557, lng: -73.9867 } },
            { name: "34th Street-Herald Square", coords: { lat: 40.7500, lng: -73.9875 } },
            { name: "14th Street-Union Square", coords: { lat: 40.7356, lng: -73.9906 } },
            { name: "Canal Street", coords: { lat: 40.7190, lng: -74.0010 } },
            { name: "DeKalb Avenue", coords: { lat: 40.6901, lng: -73.9813 } }
        ]
    },
    "Q": {
        color: "#FCCC0A",
        stations: [
            { name: "96th Street", coords: { lat: 40.7841, lng: -73.9512 } },
            { name: "86th Street", coords: { lat: 40.7796, lng: -73.9519 } },
            { name: "72nd Street", coords: { lat: 40.7685, lng: -73.9589 } },
            { name: "Lexington Avenue-63rd Street", coords: { lat: 40.7646, lng: -73.9666 } },
            { name: "57th Street-7th Avenue", coords: { lat: 40.7644, lng: -73.9805 } },
            { name: "Times Square-42nd Street", coords: { lat: 40.7557, lng: -73.9867 } },
            { name: "34th Street-Herald Square", coords: { lat: 40.7500, lng: -73.9875 } },
            { name: "14th Street-Union Square", coords: { lat: 40.7356, lng: -73.9906 } },
            { name: "Canal Street", coords: { lat: 40.7190, lng: -74.0010 } },
            { name: "DeKalb Avenue", coords: { lat: 40.6901, lng: -73.9813 } },
            { name: "Atlantic Avenue-Barclays Center", coords: { lat: 40.6835, lng: -73.9777 } },
            { name: "Prospect Park", coords: { lat: 40.6616, lng: -73.9623 } }
        ]
    },
    "R": {
        color: "#FCCC0A",
        stations: [
            { name: "Forest Hills-71st Avenue", coords: { lat: 40.7216, lng: -73.8448 } },
            { name: "Queens Plaza", coords: { lat: 40.7489, lng: -73.9372 } },
            { name: "Lexington Avenue-59th Street", coords: { lat: 40.7626, lng: -73.9672 } },
            { name: "5th Avenue-59th Street", coords: { lat: 40.7642, lng: -73.9729 } },
            { name: "57th Street-7th Avenue", coords: { lat: 40.7644, lng: -73.9805 } },
            { name: "49th Street", coords: { lat: 40.7606, lng: -73.9842 } },
            { name: "Times Square-42nd Street", coords: { lat: 40.7557, lng: -73.9867 } },
            { name: "34th Street-Herald Square", coords: { lat: 40.7500, lng: -73.9875 } },
            { name: "14th Street-Union Square", coords: { lat: 40.7356, lng: -73.9906 } },
            { name: "Canal Street", coords: { lat: 40.7190, lng: -74.0010 } },
            { name: "City Hall", coords: { lat: 40.7135, lng: -74.0076 } },
            { name: "Cortlandt Street", coords: { lat: 40.7105, lng: -74.0111 } },
            { name: "Rector Street", coords: { lat: 40.7079, lng: -74.0134 } },
            { name: "Whitehall Street", coords: { lat: 40.7033, lng: -74.0127 } }
        ]
    },
    "1": {
        color: "#EE352E",
        stations: [
            { name: "Van Cortlandt Park-242nd Street", coords: { lat: 40.8893, lng: -73.8969 } },
            { name: "238th Street", coords: { lat: 40.8843, lng: -73.9010 } },
            { name: "231st Street", coords: { lat: 40.8786, lng: -73.9046 } },
            { name: "225th Street", coords: { lat: 40.8741, lng: -73.9095 } },
            { name: "215th Street", coords: { lat: 40.8693, lng: -73.9154 } },
            { name: "207th Street", coords: { lat: 40.8647, lng: -73.9187 } },
            { name: "Dyckman Street", coords: { lat: 40.8606, lng: -73.9256 } },
            { name: "191st Street", coords: { lat: 40.8554, lng: -73.9294 } },
            { name: "181st Street", coords: { lat: 40.8499, lng: -73.9332 } },
            { name: "168th Street", coords: { lat: 40.8407, lng: -73.9399 } },
            { name: "157th Street", coords: { lat: 40.8340, lng: -73.9449 } },
            { name: "145th Street", coords: { lat: 40.8262, lng: -73.9506 } },
            { name: "137th Street-City College", coords: { lat: 40.8225, lng: -73.9536 } },
            { name: "125th Street", coords: { lat: 40.8151, lng: -73.9586 } },
            { name: "116th Street-Columbia University", coords: { lat: 40.8075, lng: -73.9647 } },
            { name: "Cathedral Parkway-110th Street", coords: { lat: 40.8039, lng: -73.9669 } },
            { name: "103rd Street", coords: { lat: 40.7990, lng: -73.9679 } },
            { name: "96th Street", coords: { lat: 40.7939, lng: -73.9723 } },
            { name: "86th Street", coords: { lat: 40.7879, lng: -73.9765 } },
            { name: "79th Street", coords: { lat: 40.7837, lng: -73.9798 } },
            { name: "72nd Street", coords: { lat: 40.7784, lng: -73.9829 } },
            { name: "66th Street-Lincoln Center", coords: { lat: 40.7737, lng: -73.9820 } },
            { name: "59th Street-Columbus Circle", coords: { lat: 40.7682, lng: -73.9819 } },
            { name: "50th Street", coords: { lat: 40.7618, lng: -73.9842 } },
            { name: "Times Square-42nd Street", coords: { lat: 40.7557, lng: -73.9867 } },
            { name: "34th Street-Penn Station", coords: { lat: 40.7508, lng: -73.9917 } },
            { name: "28th Street", coords: { lat: 40.7468, lng: -73.9931 } },
            { name: "23rd Street", coords: { lat: 40.7441, lng: -73.9951 } },
            { name: "18th Street", coords: { lat: 40.7411, lng: -73.9975 } },
            { name: "14th Street", coords: { lat: 40.7374, lng: -74.0000 } },
            { name: "Christopher Street-Sheridan Square", coords: { lat: 40.7334, lng: -74.0027 } },
            { name: "Houston Street", coords: { lat: 40.7284, lng: -74.0052 } },
            { name: "Canal Street", coords: { lat: 40.7228, lng: -74.0062 } },
            { name: "Franklin Street", coords: { lat: 40.7191, lng: -74.0069 } },
            { name: "Chambers Street", coords: { lat: 40.7151, lng: -74.0091 } },
            { name: "Cortlandt Street", coords: { lat: 40.7105, lng: -74.0111 } },
            { name: "Rector Street", coords: { lat: 40.7075, lng: -74.0137 } },
            { name: "South Ferry", coords: { lat: 40.7022, lng: -74.0133 } }
        ]
    },
    "2": {
        color: "#EE352E",
        stations: [
            { name: "Wakefield-241st Street", coords: { lat: 40.9037, lng: -73.8511 } },
            { name: "Nereid Avenue", coords: { lat: 40.8982, lng: -73.8542 } },
            { name: "233rd Street", coords: { lat: 40.8931, lng: -73.8570 } },
            { name: "225th Street", coords: { lat: 40.8880, lng: -73.8624 } },
            { name: "219th Street", coords: { lat: 40.8834, lng: -73.8655 } },
            { name: "Gun Hill Road", coords: { lat: 40.8778, lng: -73.8671 } },
            { name: "Burke Avenue", coords: { lat: 40.8712, lng: -73.8672 } },
            { name: "Allerton Avenue", coords: { lat: 40.8654, lng: -73.8672 } },
            { name: "Pelham Parkway", coords: { lat: 40.8573, lng: -73.8672 } },
            { name: "Bronx Park East", coords: { lat: 40.8490, lng: -73.8681 } },
            { name: "East 180th Street", coords: { lat: 40.8418, lng: -73.8731 } },
            { name: "West Farms Square-East Tremont Avenue", coords: { lat: 40.8402, lng: -73.8799 } },
            { name: "174th Street", coords: { lat: 40.8371, lng: -73.8873 } },
            { name: "Freeman Street", coords: { lat: 40.8299, lng: -73.8916 } },
            { name: "Simpson Street", coords: { lat: 40.8244, lng: -73.8931 } },
            { name: "Intervale Avenue", coords: { lat: 40.8220, lng: -73.8966 } },
            { name: "Jackson Avenue", coords: { lat: 40.8163, lng: -73.9078 } },
            { name: "Prospect Avenue", coords: { lat: 40.8146, lng: -73.9016 } },
            { name: "149th Street-Grand Concourse", coords: { lat: 40.8136, lng: -73.9273 } },
            { name: "135th Street", coords: { lat: 40.8144, lng: -73.9405 } },
            { name: "125th Street", coords: { lat: 40.8071, lng: -73.9452 } },
            { name: "116th Street", coords: { lat: 40.8021, lng: -73.9494 } },
            { name: "Central Park North-110th Street", coords: { lat: 40.7991, lng: -73.9521 } },
            { name: "96th Street", coords: { lat: 40.7939, lng: -73.9723 } },
            { name: "72nd Street", coords: { lat: 40.7784, lng: -73.9829 } },
            { name: "Times Square-42nd Street", coords: { lat: 40.7557, lng: -73.9867 } },
            { name: "34th Street-Penn Station", coords: { lat: 40.7508, lng: -73.9917 } },
            { name: "14th Street", coords: { lat: 40.7374, lng: -74.0000 } },
            { name: "Chambers Street", coords: { lat: 40.7151, lng: -74.0091 } },
            { name: "Wall Street", coords: { lat: 40.7067, lng: -74.0091 } },
            { name: "Clark Street", coords: { lat: 40.6970, lng: -73.9932 } },
            { name: "Borough Hall", coords: { lat: 40.6932, lng: -73.9900 } },
            { name: "Hoyt Street", coords: { lat: 40.6903, lng: -73.9851 } },
            { name: "Nevins Street", coords: { lat: 40.6881, lng: -73.9810 } },
            { name: "Atlantic Avenue-Barclays Center", coords: { lat: 40.6835, lng: -73.9777 } },
            { name: "Bergen Street", coords: { lat: 40.6801, lng: -73.9750 } },
            { name: "Grand Army Plaza", coords: { lat: 40.6752, lng: -73.9709 } },
            { name: "Eastern Parkway-Brooklyn Museum", coords: { lat: 40.6724, lng: -73.9642 } },
            { name: "Franklin Avenue", coords: { lat: 40.6707, lng: -73.9557 } }
        ]
    },
    "3": {
        color: "#EE352E",
        stations: [
            { name: "Harlem-148th Street", coords: { lat: 40.8234, lng: -73.9364 } },
            { name: "145th Street", coords: { lat: 40.8203, lng: -73.9364 } },
            { name: "135th Street", coords: { lat: 40.8144, lng: -73.9405 } },
            { name: "125th Street", coords: { lat: 40.8071, lng: -73.9452 } },
            { name: "116th Street", coords: { lat: 40.8021, lng: -73.9494 } },
            { name: "Central Park North-110th Street", coords: { lat: 40.7991, lng: -73.9521 } },
            { name: "96th Street", coords: { lat: 40.7939, lng: -73.9723 } },
            { name: "72nd Street", coords: { lat: 40.7784, lng: -73.9829 } },
            { name: "Times Square-42nd Street", coords: { lat: 40.7557, lng: -73.9867 } },
            { name: "34th Street-Penn Station", coords: { lat: 40.7508, lng: -73.9917 } },
            { name: "14th Street", coords: { lat: 40.7374, lng: -74.0000 } },
            { name: "Chambers Street", coords: { lat: 40.7151, lng: -74.0091 } },
            { name: "Wall Street", coords: { lat: 40.7067, lng: -74.0091 } },
            { name: "Clark Street", coords: { lat: 40.6970, lng: -73.9932 } },
            { name: "Borough Hall", coords: { lat: 40.6932, lng: -73.9900 } },
            { name: "Hoyt Street", coords: { lat: 40.6903, lng: -73.9851 } },
            { name: "Nevins Street", coords: { lat: 40.6881, lng: -73.9810 } },
            { name: "Atlantic Avenue-Barclays Center", coords: { lat: 40.6835, lng: -73.9777 } },
            { name: "Bergen Street", coords: { lat: 40.6801, lng: -73.9750 } },
            { name: "Grand Army Plaza", coords: { lat: 40.6752, lng: -73.9709 } },
            { name: "Eastern Parkway-Brooklyn Museum", coords: { lat: 40.6724, lng: -73.9642 } },
            { name: "Franklin Avenue", coords: { lat: 40.6707, lng: -73.9557 } },
            { name: "Nostrand Avenue", coords: { lat: 40.6693, lng: -73.9502 } },
            { name: "Kingston Avenue", coords: { lat: 40.6694, lng: -73.9422 } },
            { name: "Crown Heights-Utica Avenue", coords: { lat: 40.6689, lng: -73.9320 } },
            { name: "Sutter Avenue-Rutland Road", coords: { lat: 40.6648, lng: -73.9227 } },
            { name: "Saratoga Avenue", coords: { lat: 40.6615, lng: -73.9162 } },
            { name: "Rockaway Avenue", coords: { lat: 40.6626, lng: -73.9086 } },
            { name: "Junius Street", coords: { lat: 40.6636, lng: -73.9021 } },
            { name: "Pennsylvania Avenue", coords: { lat: 40.6655, lng: -73.8941 } },
            { name: "Van Siclen Avenue", coords: { lat: 40.6667, lng: -73.8895 } },
            { name: "New Lots Avenue", coords: { lat: 40.6663, lng: -73.8842 } }
        ]
    },
    "4": {
        color: "#00933C",
        stations: [
            { name: "Woodlawn", coords: { lat: 40.8862, lng: -73.8788 } },
            { name: "Mosholu Parkway", coords: { lat: 40.8797, lng: -73.8842 } },
            { name: "Bedford Park Boulevard-Lehman College", coords: { lat: 40.8732, lng: -73.8900 } },
            { name: "Kingsbridge Road", coords: { lat: 40.8680, lng: -73.8967 } },
            { name: "Fordham Road", coords: { lat: 40.8627, lng: -73.9010 } },
            { name: "183rd Street", coords: { lat: 40.8577, lng: -73.9041 } },
            { name: "Burnside Avenue", coords: { lat: 40.8535, lng: -73.9073 } },
            { name: "176th Street", coords: { lat: 40.8487, lng: -73.9117 } },
            { name: "Mt Eden Avenue", coords: { lat: 40.8445, lng: -73.9146 } },
            { name: "170th Street", coords: { lat: 40.8399, lng: -73.9177 } },
            { name: "167th Street", coords: { lat: 40.8354, lng: -73.9214 } },
            { name: "161st Street-Yankee Stadium", coords: { lat: 40.8279, lng: -73.9258 } },
            { name: "149th Street-Grand Concourse", coords: { lat: 40.8183, lng: -73.9270 } },
            { name: "138th Street-Grand Concourse", coords: { lat: 40.8129, lng: -73.9293 } },
            { name: "125th Street", coords: { lat: 40.8045, lng: -73.9364 } },
            { name: "116th Street", coords: { lat: 40.7989, lng: -73.9414 } },
            { name: "110th Street", coords: { lat: 40.7954, lng: -73.9445 } },
            { name: "103rd Street", coords: { lat: 40.7909, lng: -73.9479 } },
            { name: "96th Street", coords: { lat: 40.7857, lng: -73.9511 } },
            { name: "86th Street", coords: { lat: 40.7797, lng: -73.9558 } },
            { name: "77th Street", coords: { lat: 40.7734, lng: -73.9597 } },
            { name: "68th Street-Hunter College", coords: { lat: 40.7678, lng: -73.9636 } },
            { name: "59th Street", coords: { lat: 40.7627, lng: -73.9673 } },
            { name: "51st Street", coords: { lat: 40.7572, lng: -73.9712 } },
            { name: "Grand Central-42nd Street", coords: { lat: 40.7527, lng: -73.9772 } },
            { name: "33rd Street", coords: { lat: 40.7462, lng: -73.9822 } },
            { name: "28th Street", coords: { lat: 40.7429, lng: -73.9841 } },
            { name: "23rd Street", coords: { lat: 40.7395, lng: -73.9870 } },
            { name: "14th Street-Union Square", coords: { lat: 40.7347, lng: -73.9904 } },
            { name: "Astor Place", coords: { lat: 40.7298, lng: -73.9919 } },
            { name: "Bleecker Street", coords: { lat: 40.7255, lng: -73.9946 } },
            { name: "Spring Street", coords: { lat: 40.7222, lng: -73.9971 } },
            { name: "Canal Street", coords: { lat: 40.7192, lng: -74.0008 } },
            { name: "Brooklyn Bridge-City Hall", coords: { lat: 40.7131, lng: -74.0041 } },
            { name: "Fulton Street", coords: { lat: 40.7095, lng: -74.0089 } },
            { name: "Wall Street", coords: { lat: 40.7073, lng: -74.0110 } },
            { name: "Bowling Green", coords: { lat: 40.7045, lng: -74.0139 } }
        ]
    },
    "5": {
        color: "#00933C",
        stations: [
            { name: "Eastchester-Dyre Avenue", coords: { lat: 40.8883, lng: -73.8306 } },
            { name: "Baychester Avenue", coords: { lat: 40.8786, lng: -73.8382 } },
            { name: "Gun Hill Road", coords: { lat: 40.8695, lng: -73.8462 } },
            { name: "Pelham Parkway", coords: { lat: 40.8583, lng: -73.8554 } },
            { name: "Morris Park", coords: { lat: 40.8541, lng: -73.8611 } },
            { name: "Bronx Park East", coords: { lat: 40.8490, lng: -73.8681 } },
            { name: "East 180th Street", coords: { lat: 40.8418, lng: -73.8731 } },
            { name: "West Farms Square-East Tremont Avenue", coords: { lat: 40.8402, lng: -73.8799 } },
            { name: "174th Street", coords: { lat: 40.8371, lng: -73.8873 } },
            { name: "Freeman Street", coords: { lat: 40.8299, lng: -73.8916 } },
            { name: "Simpson Street", coords: { lat: 40.8244, lng: -73.8931 } },
            { name: "Intervale Avenue", coords: { lat: 40.8220, lng: -73.8966 } },
            { name: "Jackson Avenue", coords: { lat: 40.8163, lng: -73.9078 } },
            { name: "Prospect Avenue", coords: { lat: 40.8146, lng: -73.9016 } },
            { name: "149th Street-Grand Concourse", coords: { lat: 40.8136, lng: -73.9273 } },
            { name: "138th Street-Grand Concourse", coords: { lat: 40.8129, lng: -73.9293 } },
            { name: "125th Street", coords: { lat: 40.8045, lng: -73.9364 } },
            { name: "86th Street", coords: { lat: 40.7797, lng: -73.9558 } },
            { name: "59th Street", coords: { lat: 40.7627, lng: -73.9673 } },
            { name: "Grand Central-42nd Street", coords: { lat: 40.7527, lng: -73.9772 } },
            { name: "14th Street-Union Square", coords: { lat: 40.7347, lng: -73.9904 } },
            { name: "Brooklyn Bridge-City Hall", coords: { lat: 40.7131, lng: -74.0041 } },
            { name: "Fulton Street", coords: { lat: 40.7095, lng: -74.0089 } },
            { name: "Wall Street", coords: { lat: 40.7073, lng: -74.0110 } },
            { name: "Bowling Green", coords: { lat: 40.7045, lng: -74.0139 } }
        ]
    },
    "6": {
        color: "#00933C",
        stations: [
            { name: "Pelham Bay Park", coords: { lat: 40.8519, lng: -73.8275 } },
            { name: "Buhre Avenue", coords: { lat: 40.8465, lng: -73.8320 } },
            { name: "Middletown Road", coords: { lat: 40.8436, lng: -73.8365 } },
            { name: "Westchester Square-East Tremont Avenue", coords: { lat: 40.8400, lng: -73.8425 } },
            { name: "Zerega Avenue", coords: { lat: 40.8365, lng: -73.8470 } },
            { name: "Castle Hill Avenue", coords: { lat: 40.8345, lng: -73.8515 } },
            { name: "Parkchester", coords: { lat: 40.8329, lng: -73.8605 } },
            { name: "St Lawrence Avenue", coords: { lat: 40.8321, lng: -73.8672 } },
            { name: "Morrison Avenue-Soundview", coords: { lat: 40.8294, lng: -73.8741 } },
            { name: "Elder Avenue", coords: { lat: 40.8282, lng: -73.8787 } },
            { name: "Whitlock Avenue", coords: { lat: 40.8266, lng: -73.8861 } },
            { name: "Hunts Point Avenue", coords: { lat: 40.8207, lng: -73.8905 } },
            { name: "Longwood Avenue", coords: { lat: 40.8162, lng: -73.8961 } },
            { name: "East 149th Street", coords: { lat: 40.8122, lng: -73.9042 } },
            { name: "East 143rd Street-St Mary's Street", coords: { lat: 40.8085, lng: -73.9107 } },
            { name: "Cypress Avenue", coords: { lat: 40.8053, lng: -73.9147 } },
            { name: "Brook Avenue", coords: { lat: 40.8035, lng: -73.9190 } },
            { name: "138th Street-Grand Concourse", coords: { lat: 40.8129, lng: -73.9293 } },
            { name: "125th Street", coords: { lat: 40.8045, lng: -73.9364 } },
            { name: "116th Street", coords: { lat: 40.7989, lng: -73.9414 } },
            { name: "110th Street", coords: { lat: 40.7954, lng: -73.9445 } },
            { name: "103rd Street", coords: { lat: 40.7909, lng: -73.9479 } },
            { name: "96th Street", coords: { lat: 40.7857, lng: -73.9511 } },
            { name: "86th Street", coords: { lat: 40.7797, lng: -73.9558 } },
            { name: "77th Street", coords: { lat: 40.7734, lng: -73.9597 } },
            { name: "68th Street-Hunter College", coords: { lat: 40.7678, lng: -73.9636 } },
            { name: "59th Street", coords: { lat: 40.7627, lng: -73.9673 } },
            { name: "51st Street", coords: { lat: 40.7572, lng: -73.9712 } },
            { name: "Grand Central-42nd Street", coords: { lat: 40.7527, lng: -73.9772 } },
            { name: "33rd Street", coords: { lat: 40.7462, lng: -73.9822 } },
            { name: "28th Street", coords: { lat: 40.7429, lng: -73.9841 } },
            { name: "23rd Street", coords: { lat: 40.7395, lng: -73.9870 } },
            { name: "14th Street-Union Square", coords: { lat: 40.7347, lng: -73.9904 } },
            { name: "Astor Place", coords: { lat: 40.7298, lng: -73.9919 } },
            { name: "Bleecker Street", coords: { lat: 40.7255, lng: -73.9946 } },
            { name: "Spring Street", coords: { lat: 40.7222, lng: -73.9971 } },
            { name: "Canal Street", coords: { lat: 40.7192, lng: -74.0008 } },
            { name: "Brooklyn Bridge-City Hall", coords: { lat: 40.7131, lng: -74.0041 } }
        ]
    },
    "7": {
        color: "#B933AD",
        stations: [
            { name: "Flushing-Main Street", coords: { lat: 40.7596, lng: -73.8308 } },
            { name: "Mets-Willets Point", coords: { lat: 40.7546, lng: -73.8458 } },
            { name: "111th Street", coords: { lat: 40.7517, lng: -73.8550 } },
            { name: "103rd Street-Corona Plaza", coords: { lat: 40.7500, lng: -73.8625 } },
            { name: "Junction Boulevard", coords: { lat: 40.7491, lng: -73.8700 } },
            { name: "90th Street-Elmhurst Avenue", coords: { lat: 40.7487, lng: -73.8768 } },
            { name: "82nd Street-Jackson Heights", coords: { lat: 40.7474, lng: -73.8839 } },
            { name: "74th Street-Broadway", coords: { lat: 40.7469, lng: -73.8911 } },
            { name: "69th Street", coords: { lat: 40.7461, lng: -73.8964 } },
            { name: "Woodside-61st Street", coords: { lat: 40.7459, lng: -73.9028 } },
            { name: "52nd Street", coords: { lat: 40.7437, lng: -73.9129 } },
            { name: "46th Street-Bliss Street", coords: { lat: 40.7438, lng: -73.9187 } },
            { name: "40th Street-Lowery Street", coords: { lat: 40.7439, lng: -73.9237 } },
            { name: "33rd Street-Rawson Street", coords: { lat: 40.7448, lng: -73.9308 } },
            { name: "Queensboro Plaza", coords: { lat: 40.7508, lng: -73.9401 } },
            { name: "Court Square", coords: { lat: 40.7471, lng: -73.9437 } },
            { name: "Hunters Point Avenue", coords: { lat: 40.7424, lng: -73.9489 } },
            { name: "Vernon Boulevard-Jackson Avenue", coords: { lat: 40.7425, lng: -73.9537 } },
            { name: "Grand Central-42nd Street", coords: { lat: 40.7527, lng: -73.9772 } },
            { name: "5th Avenue", coords: { lat: 40.7538, lng: -73.9811 } },
            { name: "Times Square-42nd Street", coords: { lat: 40.7557, lng: -73.9867 } },
            { name: "34th Street-Hudson Yards", coords: { lat: 40.7556, lng: -74.0018 } }
        ]
    },
    "G": {
        color: "#6CBE45",
        stations: [
            { name: "Court Square", coords: { lat: 40.7471, lng: -73.9437 } },
            { name: "21st Street", coords: { lat: 40.7440, lng: -73.9494 } },
            { name: "Greenpoint Avenue", coords: { lat: 40.7304, lng: -73.9543 } },
            { name: "Nassau Avenue", coords: { lat: 40.7237, lng: -73.9510 } },
            { name: "Metropolitan Avenue", coords: { lat: 40.7126, lng: -73.9510 } },
            { name: "Broadway", coords: { lat: 40.7061, lng: -73.9502 } },
            { name: "Flushing Avenue", coords: { lat: 40.7005, lng: -73.9501 } },
            { name: "Myrtle-Willoughby Avenues", coords: { lat: 40.6945, lng: -73.9491 } },
            { name: "Bedford-Nostrand Avenues", coords: { lat: 40.6894, lng: -73.9535 } },
            { name: "Classon Avenue", coords: { lat: 40.6858, lng: -73.9599 } },
            { name: "Clinton-Washington Avenues", coords: { lat: 40.6881, lng: -73.9669 } },
            { name: "Fulton Street", coords: { lat: 40.6875, lng: -73.9754 } },
            { name: "Hoyt-Schermerhorn Streets", coords: { lat: 40.6880, lng: -73.9849 } },
            { name: "Bergen Street", coords: { lat: 40.6802, lng: -73.9751 } },
            { name: "Carroll Street", coords: { lat: 40.6780, lng: -73.9950 } },
            { name: "Smith-9th Streets", coords: { lat: 40.6740, lng: -73.9960 } },
            { name: "4th Avenue", coords: { lat: 40.6707, lng: -73.9890 } },
            { name: "7th Avenue", coords: { lat: 40.6666, lng: -73.9799 } },
            { name: "15th Street-Prospect Park", coords: { lat: 40.6615, lng: -73.9795 } },
            { name: "Fort Hamilton Parkway", coords: { lat: 40.6505, lng: -73.9753 } },
            { name: "Church Avenue", coords: { lat: 40.6449, lng: -73.9795 } }
        ]
    },
    "J": {
        color: "#996633",
        stations: [
            { name: "Jamaica Center-Parsons/Archer", coords: { lat: 40.7022, lng: -73.8013 } },
            { name: "Sutphin Boulevard-Archer Avenue-JFK Airport", coords: { lat: 40.7059, lng: -73.8074 } },
            { name: "121st Street", coords: { lat: 40.7004, lng: -73.8270 } },
            { name: "111th Street", coords: { lat: 40.6975, lng: -73.8364 } },
            { name: "104th Street", coords: { lat: 40.6951, lng: -73.8444 } },
            { name: "Woodhaven Boulevard", coords: { lat: 40.6936, lng: -73.8512 } },
            { name: "85th Street-Forest Parkway", coords: { lat: 40.6926, lng: -73.8600 } },
            { name: "75th Street-Elderts Lane", coords: { lat: 40.6911, lng: -73.8668 } },
            { name: "Cypress Hills", coords: { lat: 40.6896, lng: -73.8739 } },
            { name: "Crescent Street", coords: { lat: 40.6836, lng: -73.8733 } },
            { name: "Norwood Avenue", coords: { lat: 40.6817, lng: -73.8800 } },
            { name: "Cleveland Street", coords: { lat: 40.6802, lng: -73.8849 } },
            { name: "Van Siclen Avenue", coords: { lat: 40.6779, lng: -73.8911 } },
            { name: "Alabama Avenue", coords: { lat: 40.6767, lng: -73.8984 } },
            { name: "Broadway Junction", coords: { lat: 40.6786, lng: -73.9048 } },
            { name: "Chauncey Street", coords: { lat: 40.6828, lng: -73.9100 } },
            { name: "Halsey Street", coords: { lat: 40.6867, lng: -73.9166 } },
            { name: "Gates Avenue", coords: { lat: 40.6895, lng: -73.9222 } },
            { name: "Kosciuszko Street", coords: { lat: 40.6932, lng: -73.9287 } },
            { name: "Myrtle Avenue", coords: { lat: 40.6972, lng: -73.9356 } },
            { name: "Flushing Avenue", coords: { lat: 40.7003, lng: -73.9418 } },
            { name: "Lorimer Street", coords: { lat: 40.7038, lng: -73.9476 } },
            { name: "Hewes Street", coords: { lat: 40.7068, lng: -73.9532 } },
            { name: "Marcy Avenue", coords: { lat: 40.7086, lng: -73.9577 } },
            { name: "Essex Street", coords: { lat: 40.7185, lng: -73.9895 } },
            { name: "Bowery", coords: { lat: 40.7202, lng: -73.9941 } },
            { name: "Canal Street", coords: { lat: 40.7187, lng: -73.9994 } },
            { name: "Chambers Street", coords: { lat: 40.7129, lng: -74.0038 } },
            { name: "Fulton Street", coords: { lat: 40.7103, lng: -74.0081 } },
            { name: "Broad Street", coords: { lat: 40.7072, lng: -74.0113 } }
        ]
    },
    "Z": {
        color: "#996633",
        stations: [
            { name: "Jamaica Center-Parsons/Archer", coords: { lat: 40.7022, lng: -73.8013 } },
            { name: "Sutphin Boulevard-Archer Avenue-JFK Airport", coords: { lat: 40.7059, lng: -73.8074 } },
            { name: "121st Street", coords: { lat: 40.7004, lng: -73.8270 } },
            { name: "104th Street", coords: { lat: 40.6951, lng: -73.8444 } },
            { name: "Woodhaven Boulevard", coords: { lat: 40.6936, lng: -73.8512 } },
            { name: "75th Street-Elderts Lane", coords: { lat: 40.6911, lng: -73.8668 } },
            { name: "Crescent Street", coords: { lat: 40.6836, lng: -73.8733 } },
            { name: "Alabama Avenue", coords: { lat: 40.6767, lng: -73.8984 } },
            { name: "Broadway Junction", coords: { lat: 40.6786, lng: -73.9048 } },
            { name: "Gates Avenue", coords: { lat: 40.6895, lng: -73.9222 } },
            { name: "Myrtle Avenue", coords: { lat: 40.6972, lng: -73.9356 } },
            { name: "Marcy Avenue", coords: { lat: 40.7086, lng: -73.9577 } },
            { name: "Essex Street", coords: { lat: 40.7185, lng: -73.9895 } },
            { name: "Bowery", coords: { lat: 40.7202, lng: -73.9941 } },
            { name: "Canal Street", coords: { lat: 40.7187, lng: -73.9994 } },
            { name: "Chambers Street", coords: { lat: 40.7129, lng: -74.0038 } },
            { name: "Fulton Street", coords: { lat: 40.7103, lng: -74.0081 } },
            { name: "Broad Street", coords: { lat: 40.7072, lng: -74.0113 } }
        ]
    }
};

// We'll load pool tables from db.json via server API - this is just for reference
const poolTables = [
    { 
        id: "billiards-hall",
        name: "Billiards Hall", 
        address: "123 Jefferson St", 
        lat: 40.7068, 
        lng: -73.9209, 
        rating: 4.5
    }
];