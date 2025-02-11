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
    domain: string;
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
                            domain: '',
                        } as Values
                    }
                    validationSchema={object().shape({
                        domain: string().required('A valid domain must be provided.'),
                    })}
                >
                    <Dialog.Icon position={'container'} type={'success'} />

                    <Form>
                        <Field
                            name={'domain'}
                            label={'Domain'}
                            description={
                                'Enter the domain pointing to our reverse proxy server. This will be used to access your server from the internet.'
                            }
                        />
                    </Form>

                    <Dialog.Footer>
                        <Button.Text disabled={loading} type={'submit'}>
                            Create Reverse Proxy
                        </Button.Text>
                    </Dialog.Footer>
                </Formik>
            </Dialog>
            <Button.Text size={Button.Sizes.Small} onClick={() => setOpen(true)}>
                Add Reverse Proxy
            </Button.Text>
        </>
    );
};

export default ReverseProxyAllocationButton;
