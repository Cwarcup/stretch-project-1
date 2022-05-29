# Lighthouse Labs Stretch Project

Click [here](https://cwarcup.github.io/stretch-project-1/) to visit the site.

User can change the data by adding new data separated by commas and clicking the "Update All Selected Options" button. 

Multiple inputs can be changed at the same time. You can fill them all in, or just a few. The button will only change inputs that have been changed. This feature will also work for the color options as well. 

![Graphs preview](https://media0.giphy.com/media/0EnWLvrOlh6yalhemL/giphy.gif?cid=790b761111a11c5056a1b8e29899c66814cee1832436b1ca&rid=giphy.gif&ct=g)

Lower down the page is a stacked graph. All the features available in the single graph are available in the stacked graph.

![Graphs preview](https://media3.giphy.com/media/Kn4XX0KaroPrL9FTlE/giphy.gif?cid=790b7611f141c4bc009460438749671016f19c7ed7c4bba7&rid=giphy.gif&ct=g)
 

 Change multiple inputs at the same time!

![Graphs preview](https://media0.giphy.com/media/OTFPJEFBetuwM4Mgxn/giphy.gif?cid=790b761179c6cf7a985551536e23a2143da3dffca532e123&rid=giphy.gif&ct=g)
 
# Features
| Feature               | Description                                                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data inputs           | Change the data for a given graph. Graph will be updated one button is clicked. Each data point must be separated by a comma (`,`).                             |
| Labels                | Can change the labels below each bar. If no label is given, "undefined" will be used. Each label must be separated by a comma (`,`).                            |
| Intervals             | Change the intervals displayed on the y-axis. For example, if the data is `[0, 10, 20]` and interval is set to `5`, the y-axis will display `0, 5, 10, 15, 20`. |
| Bar gap               | Increases or decreases the gap between bars.                                                                                                                    |
| Remove title checkbox | Removes the title from the graph.                                                                                                                               |
| Title Color           | Changes the color of the title.                                                                                                                                 |
| Bar Color             | Changes the color of the bars.                                                                                                                                  |

# Known Issues

- If interval size is too small and max data value is very large, y-axis values will cause the graph to overflow. Possible solution includes dynamically changing interval size for a given data set.
- y-axis values do not line up perfectly with bars. This could be fixed by altering the position of each value in a given grid cell.

# Future Features

- Dropdowns for each graph type.
- Upon loading the page, ask for data inputs first then initialize the graph.