/**
 * 端口
 *
 * @var number
 * @property string PORT
 */
export const port: number =
    typeof process.env.PORT !== "undefined" &&
    !isNaN(parseInt(process.env.PORT)) &&
    parseInt(process.env.PORT) > 0 &&
    parseInt(process.env.PORT) < 65536
        ? parseInt(process.env.PORT)
        : 3000;

/**
 * 白名单域名，为空则为全部允许
 * 以 JSON Array 格式填写在环境变量 `ALLOWDOMAINS` 中
 *
 * @var string[]
 * @property string ALLOWDOMAINS
 */
export const allowDomains: string[] =
    typeof process.env.ALLOWDOMAINS !== "undefined" ? JSON.parse(process.env.ALLOWDOMAINS) : [];

/**
 * 超时时间
 *
 * @var number
 * @property string TIMEOUT
 */
export const timeout: number =
    typeof process.env.TIMEOUT !== "undefined" && !isNaN(parseInt(process.env.TIMEOUT))
        ? parseInt(process.env.TIMEOUT)
        : 10000;

const sizeProperties: string[] = (
    typeof process.env.SIZE !== "undefined" ? process.env.SIZE : "1920x1080"
).split("x");

/**
 *  截图屏幕大小
 *
 *  @var object
 *  @property string SIZE
 */
export const size = {
    width: parseInt(sizeProperties[0]),
    height: parseInt(sizeProperties[1]),
};
