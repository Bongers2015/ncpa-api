# ncpa-api
Reference API for NCPA

## Version: 1.0.0

**License:** UNLICENSED

### Security
**api_key**  

|apiKey|*API Key*|
|---|---|
|Name|access_token|
|In|query|

**jwtAuth**  

|apiKey|*API Key*|
|---|---|
|In|header|
|Name|authorization|

### /auth

#### GET
##### Description:

expects token as url encoded ciphered jwt token like so:
```js
const payload =
{
"iss": "TNM Auth server",
"sub": "{cp-uuid}",
"aud": "operator" | "installer",
"iat": {unix time}},
"wifi": {
"ssid": "my-ssid",
"password": "strong-wifi-password",
"type": "wpa2",
"hidden": true
};

const jwtToken = jwt.sign(payload, privateKey, {
algorithm: 'RS256'
});

const token = encodeURIComponent(encrypt(jwtToken));


```
returns an access token and its accompanying public key for signature validation

```json
{
accessToken: "eyJhbGciOiJSUzI1NiI..."
}
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | query |  | Yes | string |
| clientId | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | object |

null

### /authentication-mode

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

#### POST
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| authenticationMode | query |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /config/socket-permanent-lock-mode

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| socketLockMode | query |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /config/grid-max-current

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| maxCurrent | query |  | Yes | double |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /config/load-shedding

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| loadShedding | query |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /config/charge-station-max-current

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chargeStationMaxCurrent | query |  | Yes | double |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /config/on-off-peak

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| onOffPeak | query |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /config/grid-currents

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [GridCurrents](#gridcurrents) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

#### POST
##### Description:

jwt scopes: `installer` 

min 1 item, max 3

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gridCurrents | query |  | Yes | [ number ] |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [GridCurrents](#gridcurrents) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /config/reboot

#### POST
##### Description:

jwt scopes: `installer` 

Reboots CP

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /tests/shunt/activate

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | boolean |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /whitelist/cards

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ [Card](#card) ] |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /whitelist/cards/{token}

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | path |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Card](#card) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

#### DELETE
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | path |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Card](#card) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /whitelist/card

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [CardRegistration](#cardregistration) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /device-info

#### GET
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [DeviceInfo](#deviceinfo) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /status

#### GET
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Status](#status) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /installer-status

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [InstallerStatus](#installerstatus) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | installer |

### /charging/start

#### POST
##### Description:

jwt scopes: `operator` `

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tag | query |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /charging/stop

#### POST
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tag | query |  | Yes | string |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /charging/unlock

#### POST
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /transactions

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ [Transaction](#transaction) ] |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /schedules/chargepoint

#### GET
##### Description:

jwt scopes: `operator` `

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ChargingSchedule](#chargingschedule) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

#### POST
##### Description:

jwt scopes: `operator` `

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chargingSchedule | body |  | Yes | [ChargingSchedule](#chargingschedule) |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ChargingSchedule](#chargingschedule) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /upgrade

#### POST
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| data | formData |  | Yes | file |
| clientId | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Upgrade](#upgrade) |

##### Security

| Security Schema | Scopes | |
| --- | --- | --- |
| jwtAuth | operator | installer |

### /development/whitelist/cards

#### POST
##### Description:

jwt scopes: `developer`

Developer endpoint for whitelisting card manually

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| createCardRequest | body |  | Yes | [CreateCardRequest](#createcardrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | boolean |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /development/card/registration-response

#### POST
##### Description:

jwt scopes: `developer`

Set the response of the `/card` endpoint request

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| cardRegistrationResponse | body |  | Yes | [CardRegistration](#cardregistration) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /development/qr-gen

#### POST
##### Description:

jwt scopes: `developer` 

Creates a QR code containing an identity token


```
{
"iss": "TNM Auth server",
"sub": "{cp-uuid}",
"aud": "operator" | "installer",
"iat": 1516239022,
"wifi": {
"ssid": "my-ssid",
"password": "strong-wifi-password",
"type": "wpa2",
"hidden": true
}
}
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chargePointId | query |  | Yes | string |
| ssid | query |  | Yes | string |
| psk | query |  | Yes | string |
| privCert | formData | defaults to file contents of `./certs/server.key` | No | file |
| sharedSecret | query | Defaults to `QR_SHARED_SECRET` in `./src/constants` | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Returns QRGeneratorResponse | [QRGeneratorResponse](#qrgeneratorresponse) |

null

### Models


#### GridCurrents

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |

#### Card

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| token | string | RFID | Yes |
| status | string |  | Yes |
| expirationDate | string |  | No |

#### CardRegistration

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| card | [Card](#card) |  | No |
| status | string |  | Yes |
| statusMessage | string |  | Yes |

#### DeviceInfo

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |

#### Status

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| chargePointStatus | string |  | Yes |
| transactionStatus | [ string ] |  | Yes |
| connectorStatus | [ string ] |  | Yes |
| authorizationMode | string |  | Yes |
| numberOfRFIDCardsRegistered | long |  | Yes |

#### InstallationUsage

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |

#### InstallerStatus

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| socketLockMode | string |  | Yes |
| gridMaxCurrent | double |  | Yes |
| loadSheddingModule | string |  | Yes |
| chargeStationMaxCurrent | double |  | Yes |
| onOffPeak | string |  | Yes |
| installationUsage | [InstallationUsage](#installationusage) |  | Yes |
| gridCurrents | [GridCurrents](#gridcurrents) |  | Yes |

#### Transaction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string |  | Yes |
| remoteId | string |  | No |
| token | string | card token id | Yes |
| startDate | long |  | Yes |
| stopDate | long |  | No |
| stopReason | string |  | No |
| startWattHour | long |  | Yes |
| stopWattHour | long |  | No |
| consumedWattHours | long |  | Yes |

#### ChargingScheduleSection

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| time | double |  | Yes |
| limit | double |  | Yes |

#### ChargingSchedule

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| recurring | string |  | Yes |
| sections | [ [ChargingScheduleSection](#chargingschedulesection) ] |  | Yes |

#### Upgrade

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| originalname | string | Name of the file on the user's computer | Yes |
| encoding | string | Encoding type of the file | Yes |
| mimetype | string | Mime type of the file | Yes |
| size | double |  | Yes |
| destination | string | The folder to which the file has been saved (DiskStorage) | Yes |
| location | string | The url where to get the uploaded file (aws S3 for example) | Yes |
| filename | string | The name of the file within the destination (DiskStorage) | Yes |
| path | string | Location of the uploaded file (DiskStorage) | Yes |

#### CreateCardRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| token | string |  | Yes |

#### QRGeneratorRequestRoles

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |

#### QRGeneratorResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| ssid | string |  | Yes |
| psk | string |  | Yes |
| roles | [QRGeneratorRequestRoles](#qrgeneratorrequestroles) |  | Yes |