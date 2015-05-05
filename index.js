var carrierAddresses = require("./carrier-addresses.json");
var carriersNormalized = require("./carriers-normalized.json");

/** A list of known carriers. */
module.exports.carrierNames = Object.keys(carrierAddresses);

/**
 * Attempt to find a carrier with the given name.
 * @param {string} name - The name of the carrier to look up.
 * @return {Object|undefined} - An object with 'sms' and maybe 'mms' properties
 * listing the format for the carrier's gateway, or undefined if not found.
 */
module.exports.lookupCarrier = function(name) {
  var normal = name.toLowerCase().replace(/[^a-z\s]/g, '')
  normal = normal.replace('/\s+/g', ' ');
  var canonical = carriersNormalized[normal];
  return carrierAddresses[canonical];
};

/**
 * Normalize the given phone number to 10 digits.
 * @param number {string} - A string containing a 10-digit U.S. phone number
 * and possibly additional formatting characters, and optionally a preceeding
 * "1".
 * @return {string|undefined} Return the number as 10 digits, or undefined if
 * the number is a different length.
 */
module.exports.normalizeNumber = function(number) {
  var digits = number.replace(/[^0-9]/g, '');
  if (digits.length === 10) {
    return digits;
  } else if (digits.length === 11) {
    // U.S. only right now...
    if (digits.charAt(0) === "1") {
      return digits.substring(1);
    } else {
      return undefined;
    }
  }
  return undefined;
};

/**
 * Return a carrier-specific email gateway address for the given number and carrier.
 * @param number {string} - A 10-digit North American phone number.
 * @param carrierName {string} - A carrier as present in
 * "carrier-addresses.json".
 * @param mms {boolean} - If truthy, the mms address for the carrier (if known)
 * is used.
 * @return {string|undefined} A string with the email address for the given
 * phone number and carrier, if found.  Returns undefined if the carrier is
 * unknown or phone number is not 10 digits.
 */
module.exports.getAddress = function(number, carrierName, mms) {
  var carrier = module.exports.lookupCarrier(carrierName);
  if (carrier) {
    number = module.exports.normalizeNumber(number);
    if (number) {
      if (mms && carrier.mms) {
        return carrier.mms.replace("{number}", number);
      }
      return carrier.sms.replace("{number}", number);
    }
  }
}
