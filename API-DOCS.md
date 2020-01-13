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
accessToken: "eyJhbGciOiJSUzI1NiI...",
publicKey: "-----BEGIN CERTIFI..."
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

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### POST
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| authenticationMode | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /config/socket-lock-mode

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| socketLockMode | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /config/grid-max-current

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| maxCurrent | query |  | Yes | double |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /config/load-shedding

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| loadShedding | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /config/charge-station-max-current

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| chargeStationMaxCurrent | query |  | Yes | double |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | double |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /config/on-off-peak

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### POST
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| onOffPeak | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /config/grid-currents

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [GridCurrents](#gridcurrents) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### POST
##### Description:

jwt scopes: `installer` 

min 1 item, max 3

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gridCurrents | query |  | Yes | [ number ] |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [GridCurrents](#gridcurrents) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /config/reboot

#### POST
##### Description:

jwt scopes: `installer` 

Reboots CP

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /whitelist/cards

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ [Card](#card) ] |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /whitelist/cards/{token}

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Card](#card) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

#### DELETE
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Card](#card) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /whitelist/card

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [CardRegistration](#cardregistration) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /device-info

#### GET
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [DeviceInfo](#deviceinfo) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /status

#### GET
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Status](#status) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /installer-status

#### GET
##### Description:

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [InstallerStatus](#installerstatus) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /charging/start

#### POST
##### Description:

jwt scopes: `operator` `

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tag | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /charging/stop

#### POST
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tag | query |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /charging/unlock

#### POST
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No content |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /transactions

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ [Transaction](#transaction) ] |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /upgrade

#### POST
##### Description:

jwt scopes: `operator`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| data | formData |  | Yes | file |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [Upgrade](#upgrade) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

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

### /development/qr/{host}

#### GET
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
| host | path |  | Yes | string |
| chargePointId | query | valid chargePointId for this application would be `12345` | Yes | string |
| clientId | query |  | Yes | string |
| scope | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Returns GetAuthQrResponse | [GetAuthQrResponse](#getauthqrresponse) |

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

#### GetAuthQrResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| host | string | {protocol}://{host}:{port}/{path} | Yes |
| qrDataUrl | string | QR bitmap encoded as data url | Yes |
| requestUrl | string | authorization request url | Yes |
| encryptedToken | string | url encoded encrypted jwt token | Yes |