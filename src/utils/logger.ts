import { highlight } from 'cli-highlight';

const codeLog = function (o: any, lang: string = 'json') {
    console.log(
        highlight(JSON.stringify(o, null, 4), {
            language: lang,
            ignoreIllegals: true,
        })
    );
};

export const log = function (o: any) {
    if (o.hasOwnProperty('stack')) {
        console.error(o.stack);
        codeLog(o);
    } else if (o.hasOwnProperty('body') && o.hasOwnProperty('statusCode') && o.statusCode < 300) {
        codeLog(o.body, 'json');
        console.log('');
    } else {
        codeLog(o);
    }
};
