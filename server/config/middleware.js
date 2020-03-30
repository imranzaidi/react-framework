import helmetImport from '@server/middleware/helmet';
import bodyParserImport from '@server/middleware/bodyParser';
import cookieParserImport from '@server/middleware/cookieParser';
import csurfImport from '@server/middleware/csurf';
import staticContextImport from '@server/middleware/staticContext';
// import setStaticContextImport from '@server/middleware/setStaticContext';
import renderServerErrorImport from '@server/middleware/renderServerError';
import gzipStaticImport from '@server/middleware/gzipStatic';

export const helmet = helmetImport;
export const bodyParser = bodyParserImport;
export const cookieParser = cookieParserImport;
export const csurf = csurfImport;
export const staticContext = staticContextImport;
// export const setStaticContext = setStaticContextImport;
export const renderServerError = renderServerErrorImport;
export const gzipStatic = gzipStaticImport;
