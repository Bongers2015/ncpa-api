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

expects token as url encoded cyphered jwt token like so:
```json
{
"iss": "TNM Auth server",
"sub": "{cp-uuid}",
"aud": ["operator" | "installer", "{client-id}"],
"iat": {unix time}},
"wifi": {
"ssid": "my-ssid",
"password": "strong-wifi-password",
"type": "wpa2",
"hidden": true
}
```
returns an access token:

```json
{
"iss": "{cp-uuid}",
"sub": "{cp-uuid}",
"aud": "{client-uuid}",
"iat": 1516239022,
"scopes": ["operator" | "installer"]
}
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

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
| socketLockMode | query |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | string |

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

### /status

#### GET
##### Description:

jwt scopes: `operator`, `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ChargePointStatus](#chargepointstatus) |

##### Security

| Security Schema | Scopes |
| --- | --- |
| jwtAuth | |

### /charging/start

#### GET
##### Description:

jwt scopes: `operator` `

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

### /charging/stop

#### GET
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

jwt scopes: `installer`

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| data | formData |  | Yes | file |
| filename | formData |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [UpgradeResponse](#upgraderesponse) |

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
"aud": ["operator", "{client-id}"],
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

#### ChargePointStatus

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| code | string |  | Yes |
| statusMessage | string |  | Yes |
| plugAndChargeEnabled | boolean |  | Yes |
| numberOfRFIDCardsRegistered | double |  | Yes |

#### Transaction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string |  | Yes |
| token | string | card token id | Yes |
| startDate | string |  | Yes |
| stopDate | string |  | No |
| stopReason | string |  | No |
| startKWattHour | double |  | Yes |
| stopKWattHour | double |  | No |

#### Upgrade

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| originalname | string | Name of the file on the user's computer | Yes |
| encoding | string | Encoding type of the file | Yes |
| mimetype | string | Mime type of the file | Yes |
| size | double | Size of the file in bytes | Yes |
| destination | string | The folder to which the file has been saved (DiskStorage) | Yes |
| location | string | The url where to get the uploaded file (aws S3 for example) | Yes |
| filename | string | The name of the file within the destination (DiskStorage) | Yes |
| path | string | Location of the uploaded file (DiskStorage) | Yes |

#### UpgradeResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| filename | string |  | Yes |
| data | [Upgrade](#upgrade) |  | Yes |

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
| tokenCipher | string | url encoded encrypted jwt token | Yes |