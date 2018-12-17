

export default class Helper {

    static getWeekday(i) {
        switch (i) {
            case 0:
                return 'Sonntag';
            case 1:
                return 'Montag';
            case 2:
                return 'Dienstag';
            case 3:
                return 'Mittwoch';
            case 4:
                return 'Donnerstag';
            case 5:
                return 'Freitag';
            case 6:
                return 'Samstag';
            default:
                return 'No weekday';
        }
    }

    static weeksBetween(d1, d2) {
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    static getRndInt(number) {
        return Math.floor(Math.random() * number);
    }
}