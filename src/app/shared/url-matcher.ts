

export class UrlMatcher {
  // Cached regular expressions for matching named param parts and splatted
  // parts of urlmatcher strings.
  private _optionalParam = /\((.*?)\)/g;
  private _namedParam    = /(\(\?)?:\w+/g;
  private _splatParam    = /\*\w+/g;
  private _escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  private _urlMatcher: string;
  private _regex: RegExp;

  // Convert a url matcher string into a regular expression, suitable for matching
  // against the current location hash.
  private _toRegExp(urlMatcherStr) {
    urlMatcherStr = urlMatcherStr.replace(this._escapeRegExp, '\\$&')
      .replace(this._optionalParam, '(?:$1)?')
      .replace(this._namedParam, function(match, optional) {
        return optional ? match : '([^\/]+)';
      })
      .replace(this._splatParam, '(.*?)');
    return new RegExp('^' + urlMatcherStr + '$');
  }

  constructor(private urlMatcher:string){
    this._urlMatcher = urlMatcher;
    this._regex = this._toRegExp(urlMatcher);
  }

  test(url:string) : boolean {
    return this._regex.test(url);
  }

  // Given a urlmatcher string, and a URL url that it matches, return the array of
  // extracted decoded parameters. Empty or unmatched parameters will be
  // treated as `null` to normalize cross-browser behavior.
  extractParameters(url:string) : string[] {
    var params = this._regex.exec(url).slice(1);
    return params.map(function(param) {
      return param ? decodeURIComponent(param) : null;
    });
  }
}
