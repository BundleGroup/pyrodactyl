import { memo } from 'react';
import { ServerContext } from '@/state/server';
// import Can from '@/components/elements/Can';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import isEqual from 'react-fast-compare';
import Spinner from '@/components/elements/Spinner';
import Features from '@feature/Features';
import Console from '@/components/server/console/Console';
import StatGraphs from '@/components/server/console/StatGraphs';
import PowerButtons from '@/components/server/console/PowerButtons';
import ServerDetailsBlock from '@/components/server/console/ServerDetailsBlock';
import { Alert } from '@/components/elements/alert';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import clsx from 'clsx';

export type PowerAction = 'start' | 'stop' | 'restart' | 'kill';

const ServerConsoleContainer = () => {
    const name = ServerContext.useStoreState((state) => state.server.data!.name);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const description = ServerContext.useStoreState((state) => state.server.data!.description);
    const isInstalling = ServerContext.useStoreState((state) => state.server.isInstalling);
    const isTransferring = ServerContext.useStoreState((state) => state.server.data!.isTransferring);
    const eggFeatures = ServerContext.useStoreState((state) => state.server.data!.eggFeatures, isEqual);
    const isNodeUnderMaintenance = ServerContext.useStoreState((state) => state.server.data!.isNodeUnderMaintenance);

    return (
        <ServerContentBlock title={'Home'}>
            <div className='w-full h-full min-h-full flex-1 flex flex-col gap-4'>
                {(isNodeUnderMaintenance || isInstalling || isTransferring) && (
                    <Alert type={'warning'} className={'mb-4'}>
                        {isNodeUnderMaintenance
                            ? 'The node of this server is currently under maintenance and all actions are unavailable.'
                            : isInstalling
                              ? 'This server is currently running its installation process and most actions are unavailable.'
                              : 'This server is currently being transferred to another node and all actions are unavailable.'}
                    </Alert>
                )}
                <div className={'flex flex-col md:flex-row justify-between items-center mb-8 gap-8 mt-8 md:mt-0'}>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-[52px] font-extrabold leading-[98%] tracking-[-0.14rem]'>{name}</h1>
                        <div
                            className={clsx(
                                'relative transition rounded-full pl-3 pr-3 py-2 flex items-center gap-1',
                                status === 'offline'
                                    ? 'bg-red-400/25'
                                    : status === 'running'
                                      ? 'bg-green-400/25'
                                      : 'bg-yellow-400/25',
                            )}
                        >
                            <div
                                className={clsx(
                                    'transition rounded-full h-4 w-4',
                                    status === 'offline'
                                        ? 'bg-red-500'
                                        : status === 'running'
                                          ? 'bg-green-500'
                                          : 'bg-yellow-500',
                                )}
                            ></div>
                            <div
                                className={clsx(
                                    'transition rounded-full h-4 w-4 animate-ping absolute top-2.5 opacity-45',
                                    status === 'offline'
                                        ? 'bg-red-500'
                                        : status === 'running'
                                          ? 'bg-green-500'
                                          : 'bg-yellow-500',
                                )}
                            ></div>
                            <div className='text-sm font-bold'>
                                {status === 'offline' ? 'Offline' : status === 'running' ? 'Online' : 'Starting'}
                            </div>
                        </div>
                    </div>
                    <PowerButtons className='skeleton-anim-2 duration-75 flex gap-1 items-center justify-center' />
                </div>
                {description && (
                    <h2 className='text-sm -mt-8'>
                        <span className='opacity-50'>Description: </span>
                        {description}
                    </h2>
                )}
                <ServerDetailsBlock />
                <Console />
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
                    <Spinner.Suspense>
                        <StatGraphs />
                    </Spinner.Suspense>
                </div>
                <ErrorBoundary>
                    <Features enabled={eggFeatures} />
                </ErrorBoundary>
            </div>
        </ServerContentBlock>
    );
};

export default memo(ServerConsoleContainer, isEqual);
