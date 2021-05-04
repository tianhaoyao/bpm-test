import { Button, Pane, Text, Strong } from 'evergreen-ui'
function Clicker({key1, key2}) {


    return (
        <div>

            <Pane 
            display="flex"
            alignItems="center"
            justifyContent="center"
            
            >
                {key1 ? 


                <Pane
                    elevation={0}
                    float="left"
                    backgroundColor="#997e79"
                    width={116}
                    height={116}
                    margin={31}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    id="k1"
                >
                    <h2>K1</h2>

                </Pane>

            :

                <Pane
                    elevation={4}
                    float="left"
                    backgroundColor="#c4aca7"
                    width={130}
                    height={130}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    id="k2"
                >
                    
                    <h1>K1</h1>

            </Pane>

            }
            {key2 ? 


                <Pane
                    elevation={0}
                    float="left"
                    backgroundColor="#997e79"
                    width={116}
                    height={116}
                    margin={31}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <h2>K2</h2>

                </Pane>

                :

                <Pane
                    elevation={4}
                    float="left"
                    backgroundColor="#c4aca7"
                    width={130}
                    height={130}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    
                    <h1>K2</h1>

                </Pane>

            }
            </Pane>
            
        </div>
    )
}

export default Clicker;