var expect = require("chai").expect;
var cg = require("..");
var carrierAddresses = require("../carrier-addresses.json");

describe("Carrier gateways", function() {
  it("Looks up carriers", function() {
    cg.carrierNames.forEach(function(name) {
      expect(cg.lookupCarrier(name)).to.eql(carrierAddresses[name]);
    });
  });

  it("Normalizes number", function() {
    var map = {
      '1-801-123-4567': '8011234567',
      '+1 (323) 232-3232': '3232323232',
      '1234567890': '1234567890',
      "12345678901": "2345678901",
      "23456789012": undefined,
      "123456789012": undefined
    }
    for (var from in map) {
      expect(cg.normalizeNumber(from)).to.equal(map[from]);
    }
  });

  it("Formats SMS", function() {
    expect(cg.getAddress("8012345678", "Verizon")).to.eql("8012345678@vtext.com");
    expect(cg.getAddress("1-801-234-5678", "Verizon")).to.eql("8012345678@vtext.com");
    expect(cg.getAddress("28012345678", "Verizon")).to.be.undefined;
    expect(cg.getAddress("8012345678", "bogus")).to.be.undefined;
    expect(cg.getAddress("28012345678", "bogus")).to.be.undefined;
  });

  it("Formats MMS", function() {
    expect(cg.getAddress("8012345678", "Verizon", true)).to.eql("8012345678@vzwpix.com");
    // fall back to sms when no mms field present.
    expect(cg.getAddress("8012345678", "T-mobile", true)).to.eql("8012345678@tmomail.net");
  });
});
