// --- DOM ELEMENT REFERENCES ---
const easy = document.getElementById("easy");       // Easy problems solved count container
const medium = document.getElementById("medium");   // Medium problems solved count container
const hard = document.getElementById("hard");       // Hard problems solved count container
const submission = document.getElementById("submission"); // Total submissions container
const fname = document.getElementById("fname");     // User's real name container
const ranking = document.getElementById("ranking"); // User's ranking container
const resultContainer = document.getElementsByClassName('result');

const submit = document.getElementById("submit");   // Submit button
const uname = document.getElementById("name");      // Username input field

/**
 * Fetch user profile data from LeetCode using GraphQL
 * and update the DOM with fetched values.
 *
 * @param {string} username - The LeetCode username entered by the user.
 */
async function getLeetcodeInfo(username) {
  // Define the GraphQL query to fetch user profile & stats
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          ranking
          userAvatar
          reputation
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  // Variables to pass into the GraphQL query
  const variables = { username };

  try {
    // Use a CORS proxy since LeetCode blocks cross-origin requests directly
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const endpoint = "https://leetcode.com/graphql";

    // Make POST request to LeetCode API
    const response = await fetch(proxy + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,                // The GraphQL query string
        variables,            // Dynamic input (username)
        operationName: "getUserProfile", // For debugging
      }),
    });

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse response JSON
    const data = await response.json();
    console.log("LeetCode data:", data);

    // --- UPDATE DOM WITH USER DATA ---
    // The array order is [total, easy, medium, hard]
    easy.textContent = data.data.matchedUser.submitStats.acSubmissionNum[1].count;
    medium.textContent = data.data.matchedUser.submitStats.acSubmissionNum[2].count;
    hard.textContent = data.data.matchedUser.submitStats.acSubmissionNum[3].count;
    submission.textContent = data.data.matchedUser.submitStats.acSubmissionNum[0].count;

    ranking.textContent = data.data.matchedUser.profile.ranking;
    fname.textContent = data.data.matchedUser.profile.realName;

    // Center-align all values (for better UI presentation)
    [easy, medium, hard, submission, ranking, fname].forEach(el => {
      el.style.textAlign = "center";
    });

    // Reset button text after data is loaded
    submit.textContent = "Search";
  } catch (err) {
    resultContainer.textContent = "Content not found";
    submit.textContent = "Search";
  }
}

/**
 * Handles submit button click.
 * Prevents default form behavior, gets username, and calls API.
 */
function submitMe(event) {
  event.preventDefault();

  // Show loading state
  submit.textContent = "Searching...";

  // Get trimmed username value
  const value = uname.value.trim();

  // Fetch data only if username is not empty
  if (value) getLeetcodeInfo(value);

  // Clear input field after search
  uname.value = "";
}

// Resets output fields when search for a new user
function resetData(){
    easy.textContent = '';
    medium.textContent = '';
    hard.textContent = '';
    submission.textContent = '';
    ranking.textContent = '';
    fname.textContent = '';
}

// Attach event listener to the text field
uname.addEventListener('focus',resetData);

// Attach event listener to the submit button
submit.addEventListener("click", submitMe);