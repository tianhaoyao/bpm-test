import { Button, Pane, Text, Strong } from 'evergreen-ui'
function Clicker({key1, key2}) {


    return (
        <div>

            <Pane 
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="default"
            elevation={0}
            
            >
                {key1 ? 


                <Pane
                    elevation={0}
                    float="left"
                    backgroundColor="#c4aca7"
                    width={120}
                    height={120}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Strong>K1</Strong>

                </Pane>

            :

                <Pane
                    elevation={4}
                    float="left"
                    backgroundColor="white"
                    width={120}
                    height={120}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    
                    <Strong>K1</Strong>

            </Pane>

            }
            {key2 ? 


                <Pane
                    elevation={0}
                    float="left"
                    backgroundColor="#c4aca7"
                    width={120}
                    height={120}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Strong>K2</Strong>

                </Pane>

                :

                <Pane
                    elevation={4}
                    float="left"
                    backgroundColor="white"
                    width={120}
                    height={120}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    
                    <Strong>K2</Strong>

                </Pane>

            }
            </Pane>
            
        </div>
    )
}

export default Clicker;