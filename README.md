# Popix Mobile Application

Popix mobile application is an app built in react native that provides users with exposure to movie theater information, such as local theaters, current movies, movie schedules and showtimes. This application was created for a live demo of a mobile application in a Design Technologist interview.  


# Languages

Popix uses the react-native, a mobile version of the react framework, as well as partners with EXPO. The visualizations are originally built in D3, and then modified to work with a react-native environment which does include DOM features

# APIs

Popix uses the movieGLU API to collect information about local movie theaters and also uses the Movie DB (TMDB) API which provides additional information on the movies, such as ratings, descriptions, and images.


# Screens
<h3 align="center">Currently Running Movies</h3>

<p align="center">
<img width="445" alt="Screenshot 2025-04-01 at 4 04 46 PM" src="https://github.com/user-attachments/assets/ee07a2bc-9a3f-48bc-880e-0f8598196c8c" />
</p>

<h3 align="center">Further Details on Movies</h3>
<p align="center">
<img width="445" alt="Screenshot 2025-04-01 at 4 03 44 PM" src="https://github.com/user-attachments/assets/d505950f-0b5f-4e31-8cd3-6c344cf999b1" />
</p>

<h3 align="center">Local Cinemas Near You</h3>
<p align="center">
<img width="445" alt="Screenshot 2025-04-01 at 4 03 52 PM" src="https://github.com/user-attachments/assets/592792b2-968e-49c1-abea-a14b60dd7ae5" />
</p>

<h3 align="center">Movies Show Dates Gantt Graph</h3>

<p align="center">
<img width="445" alt="Screenshot 2025-04-01 at 4 04 01 PM" src="https://github.com/user-attachments/assets/4fb43b87-03ce-4e7b-b804-2e3331f983d5" />
</p>

# Process
## Initializing the Project
I started this application by first understanding how to implement the core functionality in react-native. During this process, I was introduced to Expo and went through the basic expo setup to build the basic version of the application. I then built a set of dummy data, as I crafted the original components, a card component that I would use for the project. This U.I. design came from investigating different interactions in Pinterest such as the following https://www.pinterest.com/pin/37999190600880453/. I decided to make simple cards to swipe through and looked to mimic a classic rounded corner card that could be clicked upon to reveal further information.

## Building Card and Inspect Pages
I initially attempted to make the application expand and scroll, but given that I was building the card in a Flatlist that scrolled horizontally I wanted to avoid scrolling in both directions, in case the two interactions interfered. I therefore decided to utilize the react router to push an inspect page onto the stack.

## MovieGLU Api
After adding in the basic details of the fake movies on the inspected page I began investigating different API options to help populate the data. After some time I discovered the movieGLU (https://movieglu.com/developers/) API, which provided users access to movie theaters and run movie data as needed. However, the API limited its users to a total of 75 uses, so I started by doing a basic call, and using that sample data instead of forcing API calls and wasting tokens. 

From this data, I reconfigured my inspect pages and built out a basic version of the application I wanted.

## Gantt Visualization
At this point, I had completed the basic functionality required for the application, I looked to build out more with the data visualization. I knew from early ideation that I wanted the application to include a scheduling aspect, as members of my community had commented on it being an issue. After inspecting the movieGlu dataset, I saw that I was collecting showtime information, and decided to build out a Gantt Chart. 

I started this work in ObservableHQ and then after building a basic version, transferred the D3 code to my react-native project, and worked to clean up any associated issues. I struggled at this point, as there was limited documentation on D3's efficiency in mobile environments, and after further research, I learned that much of my content would fail due to D3 DOM manipulations not working in a react-native mobile environment. Using A.I. I learned more about React-Native-SVG and how I could transfer my code from D3 to React-Native. 

## Issues with MovieGLU/TMDB API Integrations
At this point, I hit an issue. My code had previously been working, but the MovieGlu API went down during my development time, and I was therefore forced to use the sample code I had collected previously. In order to gain further moving information such as rating, synopsis, and a new image, alongside continuing to have some API integration, I connected with the TMDB (The Movie Database) API and learned to integrate between the two APIs by investigating different discovery criteria with TMDB. 

## Zustand Integration
Finally, after this point, in an effort to clean up code, and minimize bugs I researched and integrated in a Zustand Store, which held local variables safely. These were stored so I could pass them to components easily without having to worry about current routes and existing data on each page. Instead, I could save movie Ids and datasets, making the process more clean and seamless as I navigated between pages. 

# A.I Usage
While in general I avoided A.I. during this project, I do utilize it in key moments. 

## Model
I mostly utilized ChatGBT specifically for bug fixes. In key instances where the work I did was niche, such as running into issues with the interactions between D3 and react-native. In general however, I opted for utilizes other sources such as documentation or other sources to understand potential bugs. 

## Prompts
Below are the prompts I utilized
**Original Prompt**: For this code (rendering code for D3) in D3 and react native I am getting the error view config getter callback for component "SVG" must be a function (received undefined) - I only get this on my mobile phone, not on web.


**AI Response:**
_The error you're seeing, "View config getter callback for component 'SVG' must be a function (received undefined)", happens because React Native does not natively support the <svg> tag like a browser does. This issue occurs only on mobile because mobile devices use React Native, while the web version runs on a browser where <svg> is recognized._

_Solution
You need to use the react-native-svg package, which provides proper SVG support in React Native._

_Continued to show installation and implementation changes_

**My Judgement**
This made sense to me, as I hadn't seen anything about SVGs in react native. The implementation for installation seemed okay, but I chose to keep the code installations out, outside of replacing a couple of lines with react-native SVG naming. The majority of my functions remained the same. I did not want to just copy and paste, without understanding the code. However, I ran into an issue afterward that was strange, and I struggled to find it online. Few people were integrating react-native with D3

**Follow-up Questions**
I integrated this in. However how I am seeing "'.attr("width", width)' causing an error of this.setAttribute"

**AI Response**
_The error "this.setAttribute is not a function" happens because D3's DOM manipulation methods do not work directly with React Native components. Unlike the browser, React Native does not have a DOM, so .attr("width", width) and similar D3 methods fail when applied to React Native components._

_Solution
Instead of using D3's .attr() method on the Svg component directly, you need to set its attributes using React Native props._
<img width="300" alt="Screenshot 2025-04-01 at 5 01 03 PM" src="https://github.com/user-attachments/assets/0af58544-facd-4c8f-970d-05bba03be031" />
<img width="300" alt="Screenshot 2025-04-01 at 5 01 36 PM" src="https://github.com/user-attachments/assets/209079d5-227b-407c-9f80-d40018b22186" />
<img width="300" alt="Screenshot 2025-04-01 at 5 02 08 PM" src="https://github.com/user-attachments/assets/912e00aa-a26e-43d0-8823-ac071e7efe3c" />

**My Judgement**
The code changes made sense but were pretty intensive. I used them as a reference a little bit, but in general I created my own solution. The majority of my changes included moving as much content as possible outside of the useEffect() loop which had held the most of it. I kept the scaling, ticks, and data formatting within this loop. After that, I explored SVG react-native and built the content out as individual elements, such as rects and SVGText which I investigated personally. I added the axis on my own as well. In general, A.I. had helped me learn that the integration would be less painful but I avoided using the code it provided in order to make the visualization my own and understand the pieces better. 

## My Approach with A.I.
I believe A.I. in development is a powerful tool that should be used. However, I only believe it should be used if the code has the appropriate knowledge of the space to actually understand it, and the creativity and skill to not simply copy and paste. Otherwise, this process can lead to worse functionality, bugs that are harder to find and more.

In this project given that I was learning a new language, I avoided tools such as Copilot and forced myself to use prompts to understand my issue. Furthermore, I focused on bugs, in order to learn more, instead of asking for functionality. 

## What code is Mine V.S. AI?
A majority of the code is mine, including the react native, D3, expo, zustand, and more. I utilized documentation and bug threads at all opportunities first, and even after that I never copied and pasted from A.I. and always wrote anything myself. The areas where I did take code help were in portions of the D3 visualization, as well as in the animations on the scrollbar, which had minor impacts.


