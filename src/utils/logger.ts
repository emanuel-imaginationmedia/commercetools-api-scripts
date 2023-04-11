import { highlight } from 'cli-highlight';

const codeLog = (o: any, lang: string = 'json') => {
  console.log(
    highlight(JSON.stringify(o, null, 4), {
      language: lang,
      ignoreIllegals: true,
    }),
  );
};

export const log = (o: any) => {
  if (Object.prototype.hasOwnProperty.call(o, 'stack')) {
    console.error(o.stack);
    codeLog(o);
  } else if (
    Object.prototype.hasOwnProperty.call(o, 'body')
    && Object.prototype.hasOwnProperty.call(o, 'statusCode')
    && o.statusCode < 300
  ) {
    console.log('');
    codeLog(o.body, 'json');
  } else {
    codeLog(o);
  }
};
