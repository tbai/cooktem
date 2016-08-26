
import {UrlMatcher} from './url-matcher';



describe("UrlMatcher tests", () => {

  it("should match a given url", ()=> {
    var urlMatcher = new UrlMatcher("/user/:id");

    expect(urlMatcher.test("/user/abc")).toBe(true);

    expect(urlMatcher.test("/user/abc/z")).toBe(false);
    expect(urlMatcher.test("/user/")).toBe(false);
    expect(urlMatcher.test("/user")).toBe(false);
    expect(urlMatcher.test("user/asdf")).toBe(false);


    urlMatcher = new UrlMatcher("/printers/:printerId/messages(/:messageId)");
    expect(urlMatcher.test("/printers/000/messages")).toBe(true);
    expect(urlMatcher.test("/printers/000/messages/")).toBe(false);
    expect(urlMatcher.test("/printers/000/messages/111")).toBe(true);
    expect(urlMatcher.extractParameters("/printers/000/messages/111")).toEqual(["000", "111"]);


    urlMatcher = new UrlMatcher("/printers(/)*path");
    expect(urlMatcher.test("/printers/000/messages")).toBe(true);
    expect(urlMatcher.test("/printers/")).toBe(true);
    expect(urlMatcher.test("/printers/000")).toBe(true);
    expect(urlMatcher.test("/printers")).toBe(true);
    expect(urlMatcher.test("/printer")).toBe(false);

  });

  it("should extract the url params", ()=> {
    var urlMatcher = new UrlMatcher("/user/:id");
    expect(urlMatcher.extractParameters("/user/abc")).toEqual(["abc"]);

    urlMatcher = new UrlMatcher("/printers/:printerId/messages(/:messageId)");
    expect(urlMatcher.extractParameters("/printers/000/messages/111")).toEqual(["000", "111"]);


    urlMatcher = new UrlMatcher("/printers(/)*path");
    expect(urlMatcher.extractParameters("/printers/000/111/222")).toEqual(["000/111/222"]);
  });

});
