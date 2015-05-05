Carrier Gateways
================

A simple package to translate cell phone numbers and carriers into SMS gateway
email addresses.  Useful for sending notifications via SMS without having to
have SMS infrastructure.

Currently, the list is very US-centric, but PR's with other country's gateways
would be very welcome.

Installation
------------

Via npm:

    npm install carrier-gateways

Usage
-----

 - ``carrierGateways.getAddress(number, carrierName, [mms])`` - return the
   email address for the given number and carrier.

   ``number`` must be a 10-digit (US) phone number.  All non-numeric digits,
   and a leading US country-code is stripped out.

   ``carrierName`` should be a name as listed in ``carrier-addresses.json``.
  
   ``mms`` - if truthy, and the carrier has a separate address for mms
   messages, use that address instead.

   Example:

        var carrierGateways = require("carrier-gateways");
    
        // Look up an address.
        carrierGateways.getAddress("801-234-5678", "Verizon");
        // returns 8012345678@vztext.com
