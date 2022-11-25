import { Modal, Tooltip } from "@mantine/core"
import Image from "next/image"
import { useState } from "react"


export const ZoomImage = ({ src, alt = 'image', width, height, className }) => {
   const [open, setOpen] = useState(false);
   return <>
      <Modal size={'50%'} opened={open} onClose={() => setOpen(false)}>
         <Image src={src} alt={alt} className={'w-full ' + className} width={200} height={200} />
      </Modal>
      <Tooltip label={'Agrandar'}>
         <Image className={className + ' cursor-pointer'} src={src} alt={alt} width={width} height={height} onClick={() => setOpen(true)} />
      </Tooltip>
   </>
}