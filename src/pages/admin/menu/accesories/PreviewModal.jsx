import { Modal } from "@mantine/core"
import { Menu } from "../../../../components/menu"



export const PreviewModal = ({ open, setOpen, menu }) => {


   return <>
      <Modal
         opened={open}
         onClose={() => setOpen(false)}
         title="Vista Previa del Menu"
         size={'60%'}
      >
         <Menu menu={menu} isPreview />
      </Modal>
   </>
}