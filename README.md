# TeamworkIQ API V3 Tutorial

This project implements a set of functions that can be used to access TWIQ's API v3 list of endpoints.

## Configure the variables
Create a set of environment variables that will be used in the following examples.
The value for these variables can be found in TeamworkIQ.


### Get API Key:
1. Go to: https://app.teamworkiq.com/ and select `Integration Center`.
2. Register a new app.
3. After the app is registered, click on `GENERATE KEY`.
4. Copy the key that is generated in a safe place. This key won't be displayed again.
5. In your shell, create an environment variable for this API Key
    ```
    export TWIQ_API_KEY={api_key}
    ```


### Get Account and Template number:

1. Import a sample template into your TeamworkIQ account.
    To do so, open the following URL:  https://app.teamworkiq.com/#/import?template=templates-example-hello-world.json
    If you do not already have a TeamworkIQ account, the link above will help you create one.

2. After the template is created, edit the template. In the `Process Owners` settings, add a user to the `Process Ownerslist` and save the template.

3. Publish the template. From the URL you'll be able to get the account and template numbers.
    The url have the following format `https://app.teamworkiq.com/#/templates/p/{account_number}/{template_number}`.

4. In your shell, Create an environment variable for these values.
    ```
    export TWIQ_ACCOUNT_NO={account_number}
    export TWIQ_TEMPLATE_NO={template_number}
    ```

## Test the endpoint

- Clone this git repository and cd to this folder

### Test your API Key access:
This request is used to check whether the client's API Key successfully authenticates
the client to the TeamworkIQ API and whether the API key permits access to the account.

This operation does not depend on any account resources such as templates or processes.
It has no side effects. It is a good choice if you are doing development and want
to verify that your client is able to access the API.

    $ npm run twiq get_access $TWIQ_ACCOUNT_NO $TWIQ_API_KEY

Expected result is `Status code: 200`

### Get your template Launch Form parameters:
Get the launch parameters for this template.

For the published revision of this template, get the Launch Form definition.
The Launch Form definition specifies the fields whose values may be submitted
when launching a new process from this template. These fields are known as
Launch Parameters.

Launch Parameters can only be fetched for the published revision of the template.
An unpublished template does not allow the client to fetch Launch Parameters.

The sample field data displayed in the 200 case is what you would see if the
template's Launch Form specifies a text field named `business-name`,
a date-time field named `meeting-date` and a select field named
`region`. When you use your own process template, your custom forms will
contain arbitrary sets of fields, and these will have whatever names
you have specified in your template.

    $ npm run twiq get_template_params $TWIQ_ACCOUNT_NO $TWIQ_TEMPLATE_NO $TWIQ_API_KEY

Expected response returned is `{ fields: [...] }`

### Start a new process from a template:
Launch a new process based on the published revision of this template.

For the published revision of this template, get the Launch Form definition.
If the template has a Launch Form, then the launch request must include a
`launch_params` property that contains values for the template's Launch
Parameters. The Launch Parameters are the fields of the template's Launch
Form.

A process can only be launched from the published revision of the template.
An unpublished template does not allow the client to launch processes.

The field data in the sample request body assumes that the Launch Form
specifies a text field named `business-name`, a date-time field named
`meeting-date` and a select field named `region`. When you use your
own process template, your custom forms will contain arbitrary sets of fields,
and these will have whatever names you have specified in your template.

In order to launch a template, an object with the Launch form parameter configuration needs to be sent.

The user can create a json file with the configuration object.
The json object needs to be in the following format. (Fields key identifier can be returned from the function `get_template_params`)

  Example:
  ```
    {
        "launch_params": {
            business-name: "a"
            meeting-date: "1580792340000"
            region: ["west"]
        }
    }
  ```

  In your shell, create an environment variable with the file location
  ```
    $ export TWIQ_PAYLOAD={Your json file path}
    $ npm run twiq post_launch_template $TWIQ_ACCOUNT_NO $TWIQ_TEMPLATE_NO $TWIQ_API_KEY $TWIQ_PAYLOAD
  ```




```
    ENDPOINTS:

    Function name       Method       endpoint

    get_access           GET          /api/v3/info/${account_no}/access
    get_template_params  GET          /api/v3/templates/${account_no}/${template_no}/params
    post_launch_template POST         /api/v3/templates/${account_no}/${template_no}/commands/launch
```
