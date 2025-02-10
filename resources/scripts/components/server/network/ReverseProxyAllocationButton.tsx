import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';

import { Button } from '@/components/elements/button/index';
import { Dialog, DialogProps } from '@/components/elements/dialog';

import { ServerContext } from '@/state/server';

interface Props {
    allocation: number;
}

interface Values {
    subdomain: string;
}

const ReverseProxyAllocationButton = ({ allocation }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);

    const handleAddReverseProxy = (values: Values) => {
        setLoading(true);
        console.log(uuid, allocation, values);
        setOpen(false);
        setLoading(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title={'Reverse Proxy Network'}
                description={
                    'This will allow you to access your server from the internet using a reverse proxy. This is useful if you want to expose your server to the internet.'
                }
            >
                <Formik
                    onSubmit={handleAddReverseProxy}
                    initialValues={
                        {
                            subdomain: '',
                        } as Values
                    }
                    validationSchema={object().shape({
                        subdomain: string().required('A valid subdomain must be provided.'),
                    })}
                >
                    <Dialog.Icon position={'container'} type={'success'} />

                    <Form>
                        <Field
                            name={'subdomain'}
                            label={'Subdomain'}
                            description={
                                'Enter the subdomain added to the reverse proxy. This will be used to access your server from the internet.'
                            }
                        />
                    </Form>

                    <Dialog.Footer>
                        <Button.Text disabled={loading} type={'submit'}>
                            Add Reverse Proxy
                        </Button.Text>
                    </Dialog.Footer>
                </Formik>
            </Dialog>
        </>
    );
};

export default ReverseProxyAllocationButton;
