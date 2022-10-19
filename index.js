const { faker } = require('@faker-js/faker');
const fs = require('fs');

const deliveryItems = []
const registrationItems = []

function generateHousehold(uid){
    registrationItems.push(  {
        "household": {
          "householdId": faker.datatype.uuid(),
          "clientReferenceId": uid,
          "campaignId": "test_431421d3c6cd",
          "tenantId": "mz.health.malaria.llin",
          "apiMode": "CREATE",
          "administrativeUnit": "test_83c7322510fa",
          "numberOfIndividuals": 15,
          "dateOfRegistration": 30,
          "address": {
            "addressId": "test_b411383c5f7a",
            "addressText": "test_05e43da906e9"
          },
          "location": {
            "latitude": 1.40,
            "longitude": 79.04,
            "accuracy": 91.19
          },
          "individuals": [
            {
              "individualId": "{{guid()}}",
              "name": "faker.person.firstName()",
              "givenName": "faker.person.firstName()",
              "familyName": "faker.person.lastName()",
              "additionalName": "test_72ef956ed062",
              "dateOfBirth": faker.date.birthdate(),
              "gender": "MALE",
              "isHead": true,
              "identifiers": [
                {
                  "type": "test_18c4e8c95cc9",
                  "identifierId": "test_a9a6a570c7d6"
                }
              ],
              "addressId": "test_834ac80a7b3b",
              "additionalFields": "test_2e8104f135e4",
              "auditDetails": {
                "createdBy": "test_3040be287e86",
                "lastModifiedBy": "test_6319e12ca60d",
                "createdTime": 89,
                "lastModifiedTime": 76
              }
            }
          ],
          "additionalFields": "test_3c4cab2156be",
          "auditDetails": {
            "createdBy": "test_52c111384ef5",
            "lastModifiedBy": "test_9a9defa18c44",
            "createdTime": 66,
            "lastModifiedTime": 41
          }
        },
        "type": "householdRegistration"
      })
}

function delivery(uid){
    deliveryItems.push({
        "delivery": {
          "deliveryId": "test_ccb2b86a0830",
          "campaignId": "test_d51952394bf4",
          "registrationId": "test_6e9f73820009",
          "clientReferenceId": uid==="error1"? uid :"test_fae3e4ff8208",
          "registrationClientReferenceId": uid,
          "tenantId": "mz.health.malaria.llin",
          "status": "DELIVERED",
          "resources": [
            {
              "resourceId": "test_36743dd96e5c",
              "quantityToBeDelivered": 14,
              "quantityDelivered": 16,
              "reasonIfUndelivered": "test_b65609284838",
              "isDelivered": false
            }
          ],
          "deliveryDate": "test_0e29b90f5af4",
          "deliveredBy": "test_4fc26e910a48",
          "auditDetails": {
            "createdBy": "test_df7115b4d741",
            "lastModifiedBy": "test_9d47d23bface",
            "createdTime": 40,
            "lastModifiedTime": 8
          },
          "additionalDetails": "test_7abe2291aa02"
        },
        "type": "delivery"
      })
}

(async ()=>{

    const noOfRecordsToGenerate = 10
    await Promise.all(Array.from({ length: noOfRecordsToGenerate }).map((item,index) => {
        const uid = faker.datatype.uuid();

        switch(index){
            case 1:
                generateHousehold("error");
                delivery(uid);
                break;
            case 9:
                generateHousehold(uid);
                delivery("error1")
                break;
            default:    
                generateHousehold(uid);
                delivery(uid);
        }

      })
    );
    const response = {
        "syncUpData": [
            {
                "items":registrationItems
            },{
                "items":deliveryItems
            }
        ]
    }
    fs.writeFileSync('./generate-error-3.json', JSON.stringify(response));
})()