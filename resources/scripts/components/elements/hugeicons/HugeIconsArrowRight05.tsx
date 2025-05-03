import { HugeIconProps } from './props';

const HugeIconsArrowRight05 = (props: HugeIconProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={'h-6 w-6' + (props.className ? ` ${props.className}` : '')}
            viewBox='0 0 24 24'
            width='24'
            height='24'
            color='#000000'
            fill='none'
        >
            <path d='M20.0001 18L20.0001 6' stroke='#000000' stroke-width='1.5' stroke-linecap='round'></path>
            <path
                d='M16.0001 11.9995L4.00012 11.9995'
                stroke='#000000'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></path>
            <path
                d='M12.0002 8C12.0002 8 16.0001 10.946 16.0001 12C16.0001 13.0541 12.0001 16 12.0001 16'
                stroke='#000000'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></path>
        </svg>
    );
};

export default HugeIconsArrowRight05;
