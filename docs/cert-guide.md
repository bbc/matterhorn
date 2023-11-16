# Matterhorn Cert Update

1. [Create an CSR](https://confluence.dev.bbc.co.uk/display/ta/Requesting+certificates#Requestingcertificates-GenerateaCertificateSigningRequest(CSR)) (request for new cert).  Doing this also generates a private key that will be needed later. The host.name for LIVE matterhorn is `connected-tv-service-matterhorn.api.bbci.co.uk` and `connected-tv-service-matterhorn.test.api.bbci.co.uk` for TEST.
2. Send the CSR to IT services. They make the new cert and email back to you.
3. Back up the current certs
    - SSH on an instance (via cosmos) and copy the contents from;
    - key - /etc/pki/tls/private/globalsign.key
    - cert - /etc/pki/tls/certs/globalsign.crt
    - intermediate - /etc/pki/tls/certs/globalsign-intermediate.crt (if needed)

    n.b. Globalsign will let us know if their intermediate certs have changed. If they have, then do steps 4-6 below. This is rare and steps 4-6 can normally be skipped. [More info on intermediate certs can be found here](https://confluence.dev.bbc.co.uk/display/ta/Requesting+certificates#Requestingcertificates-Intermediateandcrosscertificates(thecertificate%22chain%22)).

4. [Download the intermediate certificate](https://support.globalsign.com/ca-certificates/intermediate-certificates/organizationssl-intermediate-certificates). Matterhorn uses the R3 cert but other services might be different.
5. [Download the appropriate cross certificate](https://support.globalsign.com/ca-certificates/root-certificates/globalsign-cross-certificates).
6. Append the cross certificate (step 5) to the end of the intermediate certificate (step 4). Copy paste the cross cert to the bottom of the intermediate cert.
7. Download and unzip the new cert from the IT Services email.
8. The private key, cert and CSR all need to be update at the same time. Therefore it is recommended that all are on the same dev machine before continuing.
9. Update the cosmos configuration for the certs. (i.e. `globalsign_certificate`, `globalsign_private_key` and if needed `globalsign_intermediate_certificate` ). Matterhorn requires the certs to be base 64 encoded. [Cosmos CLI](https://github.com/bbc/cosmos-cli) can be used to simultaneously update a service's config and base 64 encode the uploaded values.

    e.g.`cosmos set-config matterhorn test 'key' (i.e. globalsign_private_key) --file PATH-TO-FILE --secure --encoding base64`

    Or you can encode the certs on your laptop and overwrite the values in the Cosmos console (e.g. [matterhorn test env](https://cosmos.tools.bbc.co.uk/services/matterhorn/test/configuration)) manually.

    Ensure you deploy the configuration after this.

11. Test the update. ([LIVE](https://connected-tv-service-matterhorn.api.bbci.co.uk/status) and [TEST](https://connected-tv-service-matterhorn.test.api.bbci.co.uk/status))
12. Replace the certificate, CSR and private key for [TEST](https://s3.console.aws.amazon.com/s3/buckets/test-tv-cert-store?region=eu-west-1&prefix=connected-tv-service-matterhorn.test.api.bbci.co.uk/&showversions=false) and [LIVE](https://s3.console.aws.amazon.com/s3/buckets/live-tv-cert-store?region=eu-west-1&prefix=connected-tv-service-matterhorn.api.bbci.co.uk/&showversions=false) in the tv-cert-store bucket
    - The private key needs to be encrypted with the tv-cert-store key. LIVE and TEST have separate tv-cert-store keys that are managed by aws kms. You need the [`tv-cert-store-key-policy`](https://github.com/bbc/aws-access/blob/main/accounts/iptv-dev.yml#L18) attached to your aws role (LIVE and TEST) for both accounts in order to use the key.
    - Get/configure the `aws` and `aws-encryption-cli` cli tools.
    - Get the keys arn `aws kms list-aliases`.
    - Encrypt the .key file `aws-encryption-cli --encrypt -S --input <path-to-private-key> --wrapping-keys "key=<AliasArn-from-above>" --output ./<path-to-private-key>.enc`
    - Upload to the s3 bucket `aws s3 cp <path-to-private-key>.enc <path-to-store-encrypted-key-in-s3> --sse` (this can also be done via the console if you have the `AdministratorAccessRequiringMFA` policy)
    - Upload the .crt and .csr files too. These don’t need to be encrypted.
13. Delete all copies of certs, CSR and private keys from local machines.
14. Done 🙂

If you need to restore from backup certificates; please see the following guide [here](https://github.com/bbc/tv-docs/blob/main/tv-client-build-and-launch/certificate-renewal-and-decommissioning.md#guidance-for-using-backup-certificates).

