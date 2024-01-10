import {OrderItem} from "./order-item";

export class Order {

    items:OrderItem[];
    createdAt:string;
    status:string;
    constructor(
        public id:string
    ){}

  /*
  {
        "id": "c959604d-5801-4c6c-8e7b-2b62a36b8265",
        "items": [
            {
                "item": {
                    "id": "8cbabc5a-11f3-4575-b898-1e31107ece65",
                    "name": "PlayStation 5"
                },
                "quantity": 2
            },
            {
                "item": {
                    "id": "ddb002e2-75c6-4640-97ab-9b0250993e52",
                    "name": "AirPods Max"
                },
                "quantity": 2
            }
        ],
        "createdAt": "2024-01-01T22:37:55.085Z",
        "lastModifiedAt": "2024-01-01T22:37:55.085Z",
        "status": "UNPAID"
    },
   */
}
