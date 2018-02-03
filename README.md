# IOTA CL Adaptor
This adaptor is a base IOTA adaptor for Chainlink using the [iota.lib.js](https://github.com/iotaledger/iota.lib.js) library and [ExpressJS](https://expressjs.com/).

## Dependencies
To be able to run this external adaptor, you need [Docker](docker.com) installed.

## Run the Adaptor
This adaptor is published on the public docker hub, so you just need to run the two following commands:
```bash
docker pull linkpoolio/iota-cl-ea
docker run -t -p 8081:8081 -e HOST=<NODE_HOST> -e PORT=<NODE_PORT> linkpoolio/iota-cl-ea
```
To find a IOTA node, use the public directory found [here](https://iotanode.host/)

## Verify Adaptor
To ensure that the adaptor is working properly, the following call:

> http://localhost:8081/info

Should result in something similar to the following:
```json
{
    "appName": "IRI",
    "appVersion": "1.4.2.1",
    "jreAvailableProcessors": 8,
    "jreFreeMemory": 108582056,
    "jreVersion": "1.8.0_161",
    "jreMaxMemory": 7635730432,
    "jreTotalMemory": 1186463744,
    "latestMilestone": "AINWVKSNTXZTMCXGEZIVOYOWUKHUIWOSCFOFAVUXBLULAAGOYOBSFHRPNLGLUYXJN9PLKNCX9KEWZ9999",
    "latestMilestoneIndex": 340297,
    "latestSolidSubtangleMilestone": "AINWVKSNTXZTMCXGEZIVOYOWUKHUIWOSCFOFAVUXBLULAAGOYOBSFHRPNLGLUYXJN9PLKNCX9KEWZ9999",
    "latestSolidSubtangleMilestoneIndex": 340297,
    "neighbors": 40,
    "packetsQueueSize": 0,
    "time": 1517440111272,
    "tips": 9796,
    "transactionsToRequest": 7,
    "duration": 0
}
```

## API Specification
Currently, the API supports the following IOTA API queries:
* broadcastAndStore
* findTransactionObjects
* getTransactionsObjects
* getAccountData
* getNodeInfo
* sendTrytes

### /transaction-object-query
**IOTA API Function:** findTransactionObjects

Perform a transaction search based on the query parameters below.

**GET Params:**

 Param | Description 
 --- | ---
 bundles | Comma seperated list of bundle hashes 
 addresses | Comma seperated list of addresses 
 tags | Comma serperated list of transaction tags (27 trytes length) 
 approvees | Comma seperated list of approvees 

### /transaction-object
**IOTA API Function:** findTransactionObjects

Get transaction objects based on the transaction hashes.

**GET Params:**

 Param | Description 
 --- | ---
 transcations | Comma seperated list of transaction hashes 

### /account-data
**IOTA API Function:** getAccountData

Get account data by given account seed.

**GET Params:**

 Param | Description 
 --- | --- 
 seed | Account seed, non-tryte 

### /broadcast-and-store
**IOTA API Function:** broadcastAndStore

Broadcast and store trytes.

**GET Params:**

 Param | Description 
 --- | --- 
 trytes | Comma seperated list of trytes.

### /send-trytes
**IOTA API Function:** sendTrytes

Attach to trianges, then broadcast and store.

**GET Params:**

 Param | Description 
 --- | --- 
 trytes | Comma seperated list of trytes.
 depth | `int`
 minWeightMagnitude | `int`

### /info
**IOTA API Function:** getNodeInfo

Get the current nodes information.

## Development
To run the external adaptor, clone the repo and run the following commands:
```bash
    npm install
    node index.js
```
You should then see the following:

> IOTA External Adaptor Listening on:  ::8081

To run the unit tests, run the following:
```bash
    npm install -g
    npm test
```

Which should give the following output:
```
  IOTA External Adaptor
    ✓ responds to /
    ✓ responds to /account-data (2558ms)
    ✓ responds to /info (98ms)
    ✓ responds to /transaction-object (147ms)
    ✓ responds to /transaction-object-query (191ms)
    ✓ 404 everything else
```


## Contributions
If anyone has any recommendation on what IOTA API calls to support, or wants to contribute and add more themselves, please do!

Created by the [LinkPool](http://linkpool.io) Team