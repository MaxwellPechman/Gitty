export function BurgerMenu() {
    return (
        <div className="mt-2 flex flex-col gap-y-1 cursor-pointer">
            <VerticalLine/>
            <VerticalLine/>
            <VerticalLine/>
        </div>
    )
}

function VerticalLine() {
    return <div className="w-[21px] h-[1px] bg-code-grey-300"/>
}