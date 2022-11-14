# Display a list of campsites

* Endpoint path: /
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A list of campsites
* Response shape:
    ```json
    {
        "campsites": [
            {
                "facilityID": integer,
                "facilityName": string,
                "facilityPhoto": string/url,
                "latitude": float,
                "longitude": float,
                "state/province": string,
                "favorited": boolean,
            }
        ]
    }
    ```

# Get a detailed view of a campsite

* Endpoint path: /{$facilityID}
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A detailed view of a campsite
* Response shape:
    ```json
    {
        "campsite": {
            "facilityID": integer,
            "facilityName": string,
            "facilityPhoto": string/url,
            "latitude": float,
            "longitude": float,
            "state/province": string,
            "siteType": integer,
            "pets": boolean,
            "sitesWithAmps": boolean,
            "sitesWithPetsAllowed": boolean,
            "sitesWithSewerHookup": boolean,
            "sitesWithWaterHookup": boolean,
            "sitesWithWaterfront": string,
            "favorited": boolean,
        },
        "rating": float min=1 max=5,
    }
    ```

# Rate a campsite

* Endpoint path: /{$facilityID}
* Endpoint method: POST

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "rating": integer min=1 max=5,
        "user_id": integer
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string,
    }
    ```

# Favorite a campsite on detail view

* Endpoint path: /{$facilityID}
* Endpoint method: PUT

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "user_id": integer,
        "facilityID": integer,
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string,
    }
    ```

# Favorite a campsite on list view

* Endpoint path: /
* Endpoint method: PUT

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "user_id": integer,
        "facilityID": integer,
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string,
    }
    ```

# Remove a favorited a campsite on detail view

* Endpoint path: /{$facilityID}
* Endpoint method: PUT

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "user_id": integer,
        "facilityID": integer,
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string,
    }
    ```

# Remove a favorited a campsite on list view

* Endpoint path: /
* Endpoint method: PUT

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "user_id": integer,
        "facilityID": integer,
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string,
    }
    ```

# Get a list of specific campsites

* Endpoint path: /tweets?q={name}&parameter={value}...
* Endpoint method: GET
* Query parameters:
    * q: [
        name,
        state,
        camper_number,
        campsite_type,
        biking,
        hiking,
        boating,
        equipment_rental,
        fishing,
        golf,
        hiking,
        horseback_riding,
        hunting,
        recreational_activities,
        scenic_trails,
        sports,
        beach_water_activities,
        winter_activities,
        water_hookup,
        sewer_hookup,
        pull_through_driveway,
        pets_allowed,
        waterfront,
    ]

* Headers:
    * Authorization: Bearer token

* Response: A list of campsites
* Response shape:
    ```json
    {
        "campsites": [
            {
                "facilityID": integer,
                "facilityName": string,
                "facilityPhoto": string/url,
                "latitude": float,
                "longitude": float,
                "state/province": string,
            }
        ]
    }
    ```

# Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
    * account_email: string
    * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
        "account": {
            "email": string,
            "first_name": string,
            "last_name": string,
            "user_image_url": string/url,
            "city": string,
            "state/province" string,
            "preferences": {
                "pets_required": boolean,
            },
            "favorites": [
                {
                    "facilityID": integer,
                }
            ]
        },
        "token": string
    }
    ```

# Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
    * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```
